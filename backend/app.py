from flask import Flask
from flask_cors import CORS
import AO3
import heapq


app = Flask(__name__)
CORS(app)
app.debug = True

app.secret_key = 'This is your secret key to utilize session in Flask'

@app.route('/results', methods=["GET", "POST"])
def ratio():
    # TODO: allow users to search by either title, tags, author, or any_field
    # return {"items": ["this", "sucks", "man"]}
    search = AO3.Search(any_field="Clarke Lexa",  word_count=AO3.utils.Constraint(5000, 15000)) #kudos=AO3.utils.Constraint(10000)
    search.update()

    # for result in search.results:
    #     metadata = result.metadata
    #     print(result,  metadata["kudos"])

    ratio_heap = [] 
    for work in search.results:
        metadata = work.metadata
        work_keys = metadata.keys() 
        if "bookmarks" in work_keys and "kudos" in work_keys and "hits" in work_keys:
            bookmarks_to_kudos = metadata["bookmarks"] / metadata["kudos"]
            if bookmarks_to_kudos > 1:
                bookmarks_to_kudos = 1
            heapq.heappush(ratio_heap, (-1 *bookmarks_to_kudos, metadata["hits"], work))
    
    items = []
    for _ in range(min(50, len(ratio_heap))):
        bookmarks_to_kudos, hits, work = heapq.heappop(ratio_heap)
        title = work.metadata['title']
        author = work.metadata['authors']
        # bookmarks_to_kudos = "bookmarks to kudos ratio: " + str(bookmarks_to_kudos * -1)
        bookmarks = work.metadata['bookmarks'] # "bookmarks: " + str(work.metadata['bookmarks'])
        kudos = work.metadata['kudos'] # "kudos: " + str(work.metadata['kudos'])
        # hits = "hits: " + str(hits)

        # items.append(title + " - " + author + ", " + bookmarks_to_kudos + bookmarks + kudos + hits)
        item = {"title": title, "author": author, "ratio": bookmarks_to_kudos*-1, "bookmarks": bookmarks, "kudos": kudos, "hits": hits}
        items.append(item)

    # items = []
    # for work in search.results:
    #     metadata = work.metadata
    #     ratio = metadata["bookmarks"] / metadata["kudos"]
    #     item = {"title": work.metadata['title'], "author": work.metadata['authors'], "ratio": ratio, "bookmarks": metadata["bookmarks"], "kudos": metadata["kudos"], "hits": metadata["hits"]}
    #     items.append(item)

    # return render_template('results.html', items=items)
    return {"items": items}
    

if __name__ == '__main__':
    app.run(port=4455)
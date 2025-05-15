from flask import Flask, request
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
    search_input = request.args.get('query')

    completion = request.args.get('completion')
    completion_boolean = None
    if completion == "true":
        completion_boolean = True
    elif completion == "false":
        completion_boolean = False

        
    search = AO3.Search(tags=str(search_input),  kudos=AO3.utils.Constraint(3400), completion_status=completion_boolean) #kudos=AO3.utils.Constraint(10000)
    search.update()

    ratio_heap = []
    # while search.results is not None:
    for i in range(1, search.pages + 1):
        for work in search.results:
            metadata = work.metadata
            work_keys = metadata.keys() 
            if "bookmarks" in work_keys and "kudos" in work_keys and "hits" in work_keys:
                bookmarks_to_kudos = metadata["bookmarks"] / metadata["kudos"]
                if bookmarks_to_kudos > 1:
                    bookmarks_to_kudos = 1
                heapq.heappush(ratio_heap, (-1 *bookmarks_to_kudos, metadata["hits"], work))
        if i >= search.pages: break
        search.page = i+1
        search.update()
    
    print(search.total_results)

    items = []
    for _ in range(min(100, len(ratio_heap))):
        bookmarks_to_kudos, hits, work = heapq.heappop(ratio_heap)

        title = work.metadata['title']
        author = work.metadata['authors']
        bookmarks = work.metadata['bookmarks'] 
        kudos = work.metadata['kudos'] 
        work_id = work.metadata['id']

        item = {"title": title, "author": author, "ratio": round(bookmarks_to_kudos*-1, 4), "bookmarks": bookmarks, "kudos": kudos, "hits": hits, "id": work_id}
        items.append(item)

    return {"items": items}
    

if __name__ == '__main__':
    app.run(port=4455)
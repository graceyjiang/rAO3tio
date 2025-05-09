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
    items = ["pls", "god", "make this", "work"]
    search = AO3.Search(tags="Caitlyn*s*Vi%20(League%20of%20Legends)", kudos=AO3.utils.Constraint(10000))
    search.update()
    
    #print statements
    #print(search.pages)

    for result in search.results:
        metadata = result.metadata
        #print(result,  metadata["kudos"])
    #print statements

    #print("HIIIIIIIIIII==============")
    #print(len(kudos_heap))
    ratio_heap = [] 
    for work in search.results:
        metadata = work.metadata
        keys = metadata.keys() 
        if "bookmarks" in keys and "kudos" in keys and "hits" in keys:
            bookmarks_to_kudos = metadata["bookmarks"] / metadata["kudos"]
            if bookmarks_to_kudos > 1:
                bookmarks_to_kudos = 1
            #print(bookmarks_to_kudos)
            heapq.heappush(ratio_heap, (-1 *bookmarks_to_kudos, metadata["hits"],work))
    
    items = []
    for _ in range(min(50, len(ratio_heap))):
        bookmarks_to_kudos, hits, work = heapq.heappop(ratio_heap)
        title = work.metadata['title']
        author = ",".join(work.metadata['authors'])
        bookmarks_to_kudos = "bookmarks to kudos ratio: " + str(bookmarks_to_kudos * -1)
        bookmarks = ", bookmarks: " + str(work.metadata['bookmarks'])
        kudos = ", kudos: " + str(work.metadata['kudos'])
        hits = ", hits: " + str(hits)
        items.append(title + " - " + author + ", " + bookmarks_to_kudos + bookmarks + kudos + hits)
    
    # return render_template('results.html', items=items)
    return {"items": items}
    

if __name__ == '__main__':
    app.run(port=4455)
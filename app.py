from flask import Flask, render_template
import AO3
import heapq

app = Flask(__name__)
app.debug = True

app.secret_key = 'This is your secret key to utilize session in Flask'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home', methods=["GET", "POST"])
def ratio():
    search = AO3.Search(tags="Caitlyn*s*Vi%20(League%20of%20Legends)", sort_column=">kudos", sort_direction='desc')
    search.update()
    kudos_heap = []
    print(search.results)
    #for i in range(search.pages):
    #for i in range(10):
    counter = 0
    for result in search.results:
        if counter == 20:
            break
        else:
            metadata = result.metadata
            keys = metadata.keys() 

            if "kudos" in keys and "hits" in keys:
                heapq.heappush(kudos_heap, (-1 * metadata["kudos"], metadata["hits"],result))
            counter += 1
        #search.page += 1
        #search.update()
    print("HIIIIIIIIIII==============")
    print(len(kudos_heap))
    ratio_heap = [] 
    for kudos, hits, work in kudos_heap:
        metadata = work.metadata
        keys = metadata.keys() 
        if "bookmarks" in keys and "kudos" in keys and "hits" in keys:
            bookmarks_to_kudos = metadata["bookmarks"] / metadata["kudos"]
            if bookmarks_to_kudos > 1:
                bookmarks_to_kudos = 1
            #print(bookmarks_to_kudos)
            heapq.heappush(ratio_heap, (-1 *bookmarks_to_kudos, metadata["hits"],work))
   
    '''
    ratio_heap = []    
    for result in search.results:
        metadata = result.metadata
        keys = metadata.keys() 
        if "bookmarks" in keys and "kudos" in keys:
            bookmarks_to_kudos = metadata["bookmarks"] / metadata["kudos"]
            heapq.heappush(ratio_heap, (-1 * bookmarks_to_kudos, result))
    '''
    
    items = []
    for bookmarks_to_kudos, hits, work in ratio_heap:
        title = work.metadata['title']
        author = ",".join(work.metadata['authors'])
        bookmarks_to_kudos = "bookmarks to kudos ratio: " + str(bookmarks_to_kudos * -1)
        bookmarks = ", bookmarks: " + str(work.metadata['bookmarks'])
        kudos = ", kudos: " + str(work.metadata['kudos'])
        hits = ", hits: " + str(hits)
        items.append(title + " - " + author + ", " + bookmarks_to_kudos + bookmarks + kudos + hits)
    
    return render_template('home.html', items=items)
    

if __name__ == '__main__':
    app.run(port=4455)
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
    search = AO3.Search(tags="Caitlyn*s*Vi%20(League%20of%20Legends)", kudos=AO3.utils.Constraint(10000))
    search.update()
    
    #print statements
    print(search.pages)

    for result in search.results:
        metadata = result.metadata
        print(result,  metadata["kudos"])
    #print statements

    '''
    url = "https://archiveofourown.org/works/35418925/chapters/88285813"
    workid = AO3.utils.workid_from_url(url)
    print(f"Work ID: {workid}")
    work = AO3.Work(workid)
    print(f"Chapters: {work.nchapters}")
    '''
    
    '''
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
    '''
    print("HIIIIIIIIIII==============")
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
    
    return render_template('home.html', items=items)
    

if __name__ == '__main__':
    app.run(port=4455)
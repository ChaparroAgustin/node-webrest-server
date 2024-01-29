
import fs  from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer( {
    key: fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
}   ,(req, res) => {

    console.log(req.url);

    // res.writeHead(200, { 'content-type': 'text/html'});
    // res.write('<h1>Hola Mundo!</h1>');
    // res.end();

    // const data = {name:'John Doe', age:30, city:'New York'};

    // res.writeHead(200, {'content-type':'aplication/json'});
    // res.end(JSON.stringify(data));

    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type':' text/html'});
        res.end( htmlFile );
        return;
    }
    
        if(req.url?.includes('.js')){
            res.writeHead(200, { 'Content-Type':'application/javascript'});
        }
        if(req.url?.includes('.css')){
            res.writeHead(200, { 'Content-Type':'text/css'});
        }

        try {
            const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
            res.end(responseContent)
            
        } catch (error) {
            res.writeHead(404, { 'content-type': 'text/html' });
            res.end();
        }
    
})


server.listen(8080, () => {
    console.log("Server running on port 8080");
})


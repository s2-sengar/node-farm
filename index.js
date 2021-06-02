const fs=require('fs');
const url=require('url');
const http=require('http');

//reading templateFiles
const tempProduct=fs.readFileSync(`${__dirname}/templates/templateProduct.html`,'utf-8');
const tempOverview=fs.readFileSync(`${__dirname}/templates/templateOverview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/templateCard.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);
// console.log(tempCard);



const server=http.createServer((req,res)=>{
    const pathName=req.url;
    if(pathName=='/overview' || pathName=='/'){
        res.end("This is overview");
    }else if(pathName=='/product'){
        res.end("Product page");
    }else if(pathName=='/api'){
        
        // 1. read json file  ||
        //                    ||=> These two steps are done sync. in the beg; 
        // 2. parse json      ||

        // 3. Specify browser we are sending json
        res.writeHead(200,{
            'content-type':'application/json'
        })
        // 4. send data
        res.end(data);
    }else{
        res.end("not-found");
    }

});
server.listen(8000,'127.0.0.1',()=>{
    console.log("Server is listning");
});
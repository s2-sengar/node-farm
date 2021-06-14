const fs=require('fs');
const url=require('url');
const http=require('http');

//reading templateFiles
const tempProduct=fs.readFileSync(`${__dirname}/templates/templateProduct.html`,'utf-8');
const tempOverview=fs.readFileSync(`${__dirname}/templates/templateOverview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/templateCard.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);
 

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%productName%}/g, product.productName);
    output = output.replace(/{%id%}/g, product.id);
    output = output.replace(/{%image%}/g, product.image);
    output = output.replace(/{%from%}/g, product.from);
    output = output.replace(/{%nutrients%}/g, product.nutrients);
    output = output.replace(/{%quantity%}/g, product.quantity);
    output = output.replace(/{%price%}/g, product.price);
    output = output.replace(/{%description%}/g, product.description);
    if(!product.organic){
        output=output.replace(/{%isOrganic%}/g,'not-organic');
    }
    return output;
}

const server=http.createServer((req,res)=>{
    const { query , pathname} = url.parse(req.url,true);

    if(pathname=='/overview' || pathname=='/'){
        res.writeHead(200,{
            'content-type':'text/html'
        });

        const cards=dataObj.map(el => replaceTemplate(tempCard,el));
        const output=tempOverview.replace(/{%cards%}/g,cards);
        res.end(output);
    }else if(pathname=='/product'){

        res.writeHead(200,{
            'content-type':'text/html'
        });

        const product = dataObj[query.id];
        
        const output= replaceTemplate(tempProduct , product);
        res.end(output);
    }else if(pathname=='/api'){
        
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
"use strict";
const hapi=require ("@hapi/hapi");

var books=[
    {
        id:1,
        title:"JS Fundamentals",
        author:"John"
    },
    {
        id:2,
        title:"Angular Fundamentals",
        author:"David"
    },
    {
        id:3,
        title:"HTML/CSS Basics",
        author:"John"
    }
]
const init= async()=>{
	const ser=hapi.server({
	host:"localhost",
	port:3000
});
	ser.route({
		method:"GET",
		path:"/",
		handler:(request,h)=>{
			return books;
		}

	});
	ser.route({
		method:"POST",
		path:"/",
		handler:(request,h)=>{
			books.push(request.payload);
			return books;
		}
	});
	ser.route({
		method:"PUT",
		path:"/{id}",
		handler:(request,h)=>{
			 var id=request.params.id;
        	var bookToBeupdated=books.filter((book)=>{
            	return book.id==id;
				})

		bookToBeupdated[0].title=request.payload.title;
        return bookToBeupdated;
	}
	});
	ser.route({
		method:"DELETE",
		path:"/{id}",
		handler:(request,h)=>{
			 var id=request.params.id;

        var latestBooks=books.filter((book)=>{
            return book.id!=id
        })

        return latestBooks
		}

	})
	await ser.start();
	console.log("ser running on %s", ser.info.uri);

};

process.on("unhandledRejection",(err)=>{
	console.log(err);
	process.exit(1);
});

init();
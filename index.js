const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
.then(()=>console.log('Coneccion exitosa...'))
.catch(err => console.log('No se pudo conectar a mongodb...', err))

const blogSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    published: Boolean
  });

const Blog = mongoose.model('Blog', blogSchema);

async function createBlog(){

    const blog = new Blog({
        name : "Node de 0 a 100",
        published : true
    })
    
    const result = await blog.save()
    console.log(result)
}

//createBlog();

async function listBlog(){
       
    const result = await Blog.find()
    .limit(10)
    .sort({date : -1})
    console.log(result)
}

listBlog();

const updateBlog = async (id)=>{

    const blog = await Blog.findById(id)

    if (!blog) {
        console.log('Registro no existente')
        return        
    }

    blog.name = 'Vue JS'

    const result = await blog.save()
    console.log(result)


}

//updateBlog('61720887f5935fce0235ae21')

const deleteBlog = async (id) =>{
    const result = await Blog.deleteOne({_id : id})
    console.log(result)
}

//deleteBlog('61720887f5935fce0235ae21')
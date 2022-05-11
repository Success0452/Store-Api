const Product = require('../model/products')

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({}).sort('price')
    return res.status(200).json({products, nbHits: products.length})
}

const getAllProduct = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }

    if(company){
        queryObject.company = company
    }

    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }

    if(numericFilters){
        const operatorMap = {
            '<' : '$lt',
            '>' : '$gt',
            '>=' : '$gte',
            '<=' : '$lte',
            '=' : '$eq' 
        }

        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filter = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price','rating'];
        filter = filter.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value) }
            }
        })
       
    }

    console.log(queryObject);
    let result = Product.find(queryObject)

    if(sort){
        const sortList = sort.split(',').join(' ')
        result.sort(sortList);
    }else{
        result.sort('createdAt');
    }

    if(fields){
        const selectList = fields.split(',').join(' ')
        result.select(selectList);
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result.skip(skip).limit(limit);

    //23
    // 4 7 7 7 2

    const products = await result
    return res.status(200).json({products, nbHits: products.length});
}

const addProductItem = async(req, res) => {
    const product = await Product.create(req.body);
    if(!product){
        throw new Error('Error encountered')
    }
    return res.status(201).json({product});
}

const updateProductItem = async(req, res) => {
    const {id: _id} = req.params
    const products = await Product.findByIdAndUpdate({_id: _id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!products){
        throw new Error('Error encourted')
    }

    return res.status(201).json({products})
}

const deleteProductItem = async(req, res) => {
    const {id: _id} = req.params
    const product = await Product.findByIdAndDelete({_id: _id})
    if(!product){
        throw new Error('Erroe encounterd')
    }
    return res.status(200).json({success: true, msg: "Deleted Successfully"})
}

module.exports = {
    getAllProductsStatic,
    getAllProduct,
    addProductItem,
    updateProductItem,
    deleteProductItem
}
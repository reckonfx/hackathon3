import { defineType } from "sanity"

export default defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Name',
        type: 'string',
        },
        {
            name:'slug',
            title:'slug',
            type:'slug',
            options:{
                source:"title",
                maxLength:96
            }

        },
        {
        name: 'price',
        title: 'Price',
        type: 'number',
        },
        {
        name: 'description',
        title: 'Description',
        type: 'text',
        },
        {
        name: 'image',
        title: 'array',
        type: 'image',
        },
        {
            name:"category",
            title:"Category",
            type: 'string',
            options:{
                list:[
                   {title: 'T-Shirt', value: 'tshirt'},
                   {title: 'Short', value: 'short'}, 
                   {title: 'Jeans', value: 'jeans'} ,
                   {title: 'Hoddie', value: 'hoodie'} ,
                   {title: 'Shirt', value: 'shirt'} ,
                ]
            }
        },
        {
            name:"discount",
            title:"Discount Percent",
            type: 'number',
        },
        
        {
            name:"color",
            title:"Colors",
            type: 'array',
            of:[
                {type: 'string'}
            ]
        },
        {
            name:"size",
            title:"Sizes",
            type: 'array',
            of:[
                {type: 'string'}
            ]
        },
        {
            name:"qty",
            title:"Quantity",
            type:"number"
        }
       
    ],
})
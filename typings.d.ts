 export interface Product {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    discount: number;
    new: boolean;
    color: string[];
    size: string[];
    slug:string;
    qty:number;
    id: string | number
  }
  export interface ICart{
    id:number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    discount: number;
    color: string[];
    size: string[];
    slug:string;
    qty:number;
    totalPrice:number;
    
    
    
  }
  
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../component/context/StoreContext'
import { toast } from 'react-toastify'
import Layout from './Layout'

const Productdetail = () => {
    const { product, setproduct,setcartproducts } = useContext(StoreContext)

    const { id } = useParams()

    //fetch product detail 
    const fetchProduct = async (id) => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
            if(res?.data)
            setproduct(res.data)
        } catch (error) {
            toast.error("Fetch product failed:", error)
        }
    }

    // Add to cart 
    const addToCart = (product) => {
        setcartproducts((prevProducts) => {
            const existingProduct = prevProducts.find(p => p.id === product.id);
            if (existingProduct) {
                //increase count
                toast.info("Product Quantity updated", {
                    autoClose: 2000,
                    className: "custom-toast",
                })
                return prevProducts.map(p => p.id === product.id ? { ...p, count: p.count + 1 } : p)
            } else {
                toast.success("Product added to cart!", {
                    autoClose: 2000,
                    className: "custom-toast",
                })
                return [...prevProducts, { ...product, count: 1 }];
            }
        })
    }

    useEffect(() => {
        if (id && id !== "") fetchProduct(id)
        return () => {
            setproduct(null)
        }
    }, [id])

    if (product)
        return (
    <Layout>

            <div className='block md:flex w-full md:h-[100vh]'>
                <div className='md:w-[40%] h-[50vh] md:h-full flex items-center p-[20px] justify-center'>
                    <img src={product.image} alt="img" width="200" />
                </div>
                <div className='md:w-[60%] h-full bg-gray-800 text-white p-[50px] md:p-[150px]'>
                    <h1 className='text-2xl md:text-4xl font-semibold mt-4'>{product.title}</h1>
                    <p className='text-1xl mt-3'>{product.description}</p>
                    <h3 className='text-2xl md:text-3xl font-bold mt-2'>Price: ${product.price}</h3>
                    <button onClick={() => addToCart(product)} className='py-1 px-3 border-2 border-white mt-3 rounded-full'>Add to Cart</button>
                </div>
            </div>
    </Layout>

        )
}

export default Productdetail

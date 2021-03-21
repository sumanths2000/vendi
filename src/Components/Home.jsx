import React,{useState,useLayoutEffect} from 'react'
import {useSelector} from 'react-redux'
import firebase  from 'firebase/app'
import Header from './Header'
import './Home.css'
import {useHistory} from 'react-router-dom'

function Home() {
    const user=useSelector(state=>state.user.user);
    const [product1,setProduct1]=useState(5);
    const [productImg1,setProductImg1]=useState('');
    const [seller,setSeller]=useState(0)
    const [product2,setProduct2]=useState(5);
    const [productImg2,setProductImg2]=useState('');
    const [product3,setProduct3]=useState(5);
    const [productImg3,setProductImg3]=useState('');
    const [product4,setProduct4]=useState(5);
    const [productImg4,setProductImg4]=useState('');
    useLayoutEffect(() => {
        const quanityLeft1=firebase.database().ref('/product/'+1);
        quanityLeft1.on('value',snapshot=>{
            const slotNumber=(snapshot.val());
            if(slotNumber!=null){
                setProduct1(5-slotNumber.p_quantity)
                setProductImg1(slotNumber.p_image)
            }
            else{
                setProduct1(product1)
            }
        })
        const quanityLeft2=firebase.database().ref('/product/'+2);
        quanityLeft2.on('value',snapshot=>{
            const slotNumber=(snapshot.val());
            if(slotNumber!=null){
                setProduct2(5-slotNumber.p_quantity)
                setProductImg2(slotNumber.p_image)
            }
            else{
                setProduct2(product2)
            }
        })
        const quanityLeft3=firebase.database().ref('/product/'+3);
        quanityLeft3.on('value',snapshot=>{
            const slotNumber=(snapshot.val());
            if(slotNumber!=null){
                setProduct3(5-slotNumber.p_quantity)
                setProductImg3(slotNumber.p_image)
            }
            else{
                setProduct3(product3)
            }
        })
        const quanityLeft4=firebase.database().ref('/product/'+4);
        quanityLeft4.on('value',snapshot=>{
            const slotNumber=(snapshot.val());
            if(slotNumber!=null){
                setProduct4(5-slotNumber.p_quantity)
                setProductImg4(slotNumber.p_image)
            }
            else{
                setProduct4(product4)
            }
        })
        const sales=firebase.database().ref('/seller');
        sales.on('value',snapshot=>{
            const sale=(snapshot.val());
            if(sale!=null){
                setSeller(sale.totalSales)
            }
            else{
                setSeller(seller)
            }
        })
    }, [])
    const history=useHistory()
    const addProduct=()=>{
        history.push("/addnewproduct")
    }
    return (
        <div className="homeContainer">
            <Header />
            <div className="gridContainer">
                <div className="gridBox">
                {productImg1 && <img src={productImg1}/>}
                    <strong>Slot No 1</strong>
                    <p>No of Products Space Left:<strong>{product1}</strong></p>
                    </div>
                <div className="gridBox">
                {productImg2 && <img src={productImg2}/>}
                    <strong>Slot No 2</strong>
                    <p>No of Products Space Left:<strong>{product2}</strong></p>
                </div>
                <div className="gridBox">
                {productImg3 && <img src={productImg3}/>}
                    <strong>Slot No 3</strong>
                    <p>No of Products Space Left:<strong>{product3}</strong></p>
                </div>
                <div className="gridBox">
                {productImg4 && <img src={productImg4}/>}
                    <strong>Slot No 4</strong>
                    <p>No of Products Space Left:<strong>{product4}</strong></p>
                </div>
            </div>
            <div className="salesContainer">
                <h2>Total No of Sales:{seller}</h2> 
            </div>
            <button onClick={addProduct} className="addToProductbtn">Add New Product</button>
        </div>
    )
}

export default Home

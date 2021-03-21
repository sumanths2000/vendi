import React,{useState} from 'react'
import './AddNewProduct.css'
import firebase from 'firebase/app'
import 'firebase/database'
import {storage} from '../firebase'
import {useHistory} from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import Header from './Header'

function AddNewProduct() {
    const history=useHistory();
    const [loading,setLoading]=useState(false)
    const [file,setFile]=useState('');
    const [product,setProduct]=useState('')
    const [desc,setDesc]=useState('')
    const [slot,setSlot]=useState('1')
    const [quant,setQuant]=useState('1')
    const [price,setPrice]=useState(0)
    // Uploading Images Handler
    async function submitHandler(e) {
        e.preventDefault();
        setLoading(true);
        let productQuantity=0;
        const database=firebase.database();
        const quanityLeft=firebase.database().ref('/product/'+slot);
        quanityLeft.on('value',snapshot=>{
            const slotNumber=(snapshot.val());
            if(snapshot.exists()){
                productQuantity=slotNumber.p_quantity;
            }
        })
        const validQuantity=parseInt(quant)
        const valid=productQuantity+validQuantity;
        if(valid>5){
                setDesc('')
                setPrice(0)
                setProduct('')
                setQuant('1')
                setSlot('1')
                document.getElementById('form').reset();
                setLoading(false)
            alert("Please enter valid quantity left")
            return;
        }
        const intSlot=parseInt(slot)
        const uploadTask=storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
        "state_changed",
        snap=>{},
        error=>{
            alert("Cant Upload Image");
            setDesc('')
                setPrice(0)
                setProduct('')
                setQuant('1')
                setSlot('1')
                setLoading(false)
                document.getElementById('form').reset();
        },
        async()=>{
            storage.ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(url=>{
                database.ref('/product/'+slot).update({
                    p_details:desc,
                    p_image:url,
                    p_name:product,
                    p_quantity:valid,
                    price:parseInt(price),
                    slot_no:intSlot
                })
                setDesc('')
                setPrice(0)
                setProduct('')
                setQuant('1')
                setSlot('1')
                setLoading(false)
                document.getElementById('form').reset();
                history.replace("/")
                
               
            })
        })
    
        
        setLoading(false)
    }
    function onChangeHandler(e) {
        let fileImage=e.target.files[0];
        setFile(fileImage);
    }
    if(loading){
        return (
            <div className="circular"><CircularProgress /></div>
        )
    }
    return (
        <div className="addContainer">
            <Header />
            <h2>Add New Product</h2>
            <form id="form" className="formContainer" onSubmit={(e)=>submitHandler(e)}>
            <input type="file" name="file" required onChange={(e)=>onChangeHandler(e)}/>
            <input type="text" placeholder="Product Name" required value={product} onChange={(e)=>setProduct(e.target.value)}/>
            <label htmlFor="select" required>Select Slot Number</label>
            <select name="select" value={slot} onChange={(e)=>{
                const selectedSlot=e.target.value;
                setSlot(selectedSlot);
            }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" required/>

            <label htmlFor="quantity">Select Quantity</label>
            <select name="quantity" value={quant} onChange={(e)=>{
                const selectedQuant=e.target.value;
                setQuant(selectedQuant);
            }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                
            </select>
            <textarea cols="30" rows="4" placeholder="Description" required value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
            <button type="submit" disabled={loading}>Add New Product</button>

            </form>
        </div>
    )
}

export default AddNewProduct


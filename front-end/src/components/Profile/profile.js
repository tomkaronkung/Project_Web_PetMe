import './profile.css';
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CancelIcon from '@material-ui/icons/Cancel';

import Wall_dog from './img/wallpaper.jpg'
import Profile_Dog from './img/profile3.jpg'
import Profile_Dog2 from './img/profile1.jpg'

import Profile_leftside_pic_src from './img/cat.jpg'
import Profile_item1_src from './img/item1.jpg'
import Profile_item2_src from './img/item2.jpg'
import Profile_icon_src from './img/profile.jpg'
import Profile_wallpaper_src from './img/wall.jpg'

import PopUp from './popUppayment'

import CardItem_Accept from './CardItem_Accept';
import CardItem_Wait from './CardItem_Wait';
import CardStore from './CardStoreSell';
import CardStoreSold from './CardStoreSold';
import CardStoreSell from './CardStoreSell';
import UserLike from './UserLike'
import UserAccept from './UserAccept'
import UserCancel from './UserCancel'
import fetch from 'unfetch';


library.add(fas, fab, far);

const Profile = () => {
    const [profileTab, setprofileTab] = useState([true, false, false, false, false, false])
    const [name,setName]= useState()
    const [email,setEmail]= useState()
    const [mobileNumber,setMobileNumber]= useState()
    const [date,setDate]= useState()
    const [address,setAddress]= useState()
    const [road,setRoad]= useState()
    const [subDistrict,setSubDistrict]= useState()
    const [district,setDistrict]= useState()
    const [province,setProvince] = useState()
    const [postalCode,setPostalCode] = useState()


    
    //   React.useEffect(() => {

    //   },[]);

    const profileSwitch = (selectedTab) => {
        if (selectedTab === 1) {
            setprofileTab([true, false, false, false, false, false])
        }
        else if (selectedTab === 2) {
            setprofileTab([false, true, false, false, false, false])
        }
        else if (selectedTab === 3) {
            setprofileTab([false, false, true, false, false, false])
        }
        else if (selectedTab === 4) {
            setprofileTab([false, false, false, true, false, false])
        }
        else if (selectedTab === 5) {
            setprofileTab([false, false, false, false, true, false])
        }
        else {
            setprofileTab([false, false, false, false, false, true])
        }
    }

    const showPopUpsell = (type) => {
        if (type === 'Sell') {
            setPopUp(true)
            // getTotalPaid()
        }
    }
    // --------------------------------------------Account Page----------------------------------------------------------
    const Account = () =>{
        console.log("Hello in sayHello")
    }

    const showPopUpEdit = (type) => {
        if (type === 'Edit') {
            setPopUp(true)
            // getTotalPaid()
        }
    }
    // --------------------------------------------Exit Page----------------------------------------------------------
    const showPopUpExit = (type) => {
        if (type === 'Exit') {
            // setPopUpExit(true)
            // getTotalPaid()
        }
    }

    // ******************Edit****************
    
    

    // --------------------------------------------like Page----------------------------------------------------------
    
    const [likeTab, setlikeTab] = useState([true, false, false]);


    const likeSwitch = (selectedTab) => {
        if (selectedTab === 1) {
            setlikeTab([true, false, false])
        }
        else if (selectedTab === 2) {
            setlikeTab([false, true, false])
        }
        else {
            setlikeTab([false, false, true])
        }
    }

    const showPopUpDog = (type) => {
        if (type === 'Dog') {
            // setPopUpDog(true)
            // getTotalPaid()
        }
    }

    // --------------------------------------------Store Page----------------------------------------------------------
    
    const [storeTab, setstoreTab] = useState([true, false]);

    const storeSwitch = (selectedTab) => {
        if (selectedTab === 1) {
            setstoreTab([true, false])
        }
        else{
            setstoreTab([false, true])
        }
    }

    const [likeNameTab, setlikeNameTab] = useState([true, false, false]);

    const likeNameSwitch = (selectedTab) => {
        if (selectedTab === 1) {
            setlikeNameTab([true, false, false])
        }
        else if (selectedTab === 2) {
            setlikeNameTab([false, true, false])
        }
        else{
            setlikeNameTab([false, false, true])
        }
    }

    // --------------------------------------------Payment Page----------------------------------------------------------
    const [classStyle, setClassStyle] = useState('menu-header')
    const [astStyle, setAstStyle] = useState('ast')
    const [notPaidDogData, setNotPaidDogData] = useState([{ name: 'หมาชนิดแรก', picture: Profile_item1_src, price: 7000, amount: 1 },
    { name: 'หมาชนิดสอง', picture: Profile_item2_src, price: 12000, amount: 1 }])

    const [paidDogData, setPaidDogData] = useState([{ name: 'หมาชนิดแรกจ่ายและ', picture: Profile_item1_src, price: 8000, amount: 1 },
    { name: 'หมาชนิดสองจ่ายและ', picture: Profile_item2_src, price: 15000, amount: 1 }])

    const [totalPaid, setTotalPaid] = useState(12000 + 7000)
    const [popUp, setPopUp] = useState(false)
    const [canceledPaidDog, setCanceledPaidDog] = useState([])

    const [moneyTab, setMoneyTab] = useState([true, false, false])

    const setToggle = () => {
        classStyle == 'menu-header' ? setClassStyle('menu-header active') : setClassStyle('menu-header')
        classStyle == 'menu-header active' ? setAstStyle('ast-fullbg') : setAstStyle('ast')
        console.log({ astStyle })
    }
 
    const cancelPaidDog = (selectedItem) => {
        let tempNotPaidDogData = []
        let shallowCanceledPaidDog = canceledPaidDog
        for (let i = 0; i < notPaidDogData.length; i++) {
            if (notPaidDogData[i] !== selectedItem) {
                tempNotPaidDogData.push(notPaidDogData[i])
            }
            else shallowCanceledPaidDog.push(selectedItem)
        }
        setNotPaidDogData(tempNotPaidDogData)
        setCanceledPaidDog(shallowCanceledPaidDog)

        let curTotalPaid = 0
        if (tempNotPaidDogData.length > 0) {
            tempNotPaidDogData.map(each => {
                let curTotal = curTotalPaid + (each.price * each.amount)
                setTotalPaid(curTotal)
            })
        }
        else setTotalPaid(0)
    }

    const showPopUp = (type) => {
        if (type === 'Buy') {
            setPopUp(true)
            getTotalPaid()
        }
    }

    const getTotalPaid = () => {
        return totalPaid
    }

    const moneySwitch = (selectedTab) => {
        if (selectedTab === 1) {
            setMoneyTab([true, false, false])
        }
        else if (selectedTab === 2) {
            setMoneyTab([false, true, false])
        }
        else {
            setMoneyTab([false, false, true])
        }
    }

    const delCanceledPaidDog = (item) => {
        let tempCanceledPaidDogData = []
        let tempNotPaidDogData = notPaidDogData
        for (let i = 0; i < canceledPaidDog.length; i++) {
            if (canceledPaidDog[i] !== item) {
                tempCanceledPaidDogData.push(canceledPaidDog[i])
            }
            else tempNotPaidDogData.push(canceledPaidDog[i])
        }
        setCanceledPaidDog(tempCanceledPaidDogData)
        setNotPaidDogData(tempNotPaidDogData)

        let curTotalPaid = 0
        tempNotPaidDogData.map(each => {
            curTotalPaid = curTotalPaid + (each.price * each.amount) 
        })
        setTotalPaid(curTotalPaid)
        console.log(curTotalPaid)
    }
    React.useEffect(() => {
        const fetchdata = async() =>{
          const res = await fetch("http://localhost:4000/api/get/profile", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: "cors",
          body: JSON.stringify({
              username : "tomkabtokom"
          }),
        })
        const data = await res.json();
        setName(data.name)
        setEmail(data.email)
        setMobileNumber(data.mobileNumber)
        setDate(data.birth)
        setAddress(data.address)
        setRoad(data.road)
        setSubDistrict(data.subDistrict)
        setDistrict(data.district)
        setProvince(data.province)
        setPostalCode(data.postalCode)
        }
        fetchdata()
      },[]);
    

    return (
        <div style={{height:'100%',width:'100%'}}>
            <div className = 'containerProfile'></div>
            <div class ='content'>
                <h1>บัญชีของฉัน</h1>
            </div>
            {profileTab[0] && 
            <div className = "content2">
                
                <div className="tab_one">
                    <label>
                        <div className='img_border'>
                            <img className='img-wrap' src={Profile_Dog}/>
                        </div>  
                        {/* <input id="photo-upload" type="file" onChange={this.handleInputChange}/>  */}
                    </label>
                    <div className="profile_bar"> 
                            <div className="SidebarList">
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title" style={{color: "#ED8E82" }}>บัญชีของฉัน</div>                                                                 
                                    </li>
                                    <li onClick={() => profileSwitch(2)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สนใจ</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(3)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ร้านค้าของฉัน</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(4)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สถานะการชำระเงิน</div>                          
                                    </li>
                                    <li onClick={() => showPopUpExit('Exit')} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ออกจากระบบ</div>                          
                                    </li>
                            </div>
                            <div className='sell-pane'>
                                <button class="sell-button" onClick={() => showPopUp('Sell')}>
                                    + ลงขาย
                                </button>
                            </div>
                    </div>
                </div>
                <div className='account_details'>
                    <div className = "head_topic">
                        <p>รายละเอียดบัญชี</p>
                    </div>
                        
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ชื่อ-นามสกุล</p>           
                            </div> 
                            <input type="text" value="" placeholder={name} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>อีเมล</p>           
                            </div> 
                            <input type="text" value="" placeholder={email} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>เบอร์โทรศัพท์</p>           
                            </div> 
                            <input type="text" value="" placeholder={mobileNumber} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>วันเกิด</p>           
                            </div> 
                            <input type="text" value="" placeholder={date} id="text"></input>
                        </div>
                        
                    <div className = "head_topic">
                        <p>รายละเอียดที่อยู่</p>
                    </div>
                        <div className ="Account_Text">
                            <div id="name">
                                <p>ที่อยู่</p>           
                            </div> 
                            <input type="text" value="" placeholder={address} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ถนน</p>           
                            </div> 
                            <input type="text" value="" placeholder={road} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ตำบล</p>           
                            </div> 
                            <input type="text" value="" placeholder={subDistrict} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>อำเภอ</p>           
                            </div> 
                            <input type="text" value="" placeholder={district} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>จังหวัด</p>           
                            </div> 
                            <input type="text" value="" placeholder={province} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>รหัสไปรษณีย์</p>           
                            </div> 
                            <input type="text" value="" placeholder={postalCode} id="text"></input>
                        </div>
                        <div className='Edit-pane'>
                            <button class="Edit-button" onClick={() => profileSwitch(5)}>
                                แก้ไขข้อมูล
                            </button>
                        </div>
                </div>
                    
            </div>}

{/* -----------------------------------------------LIKE PAGE---------------------------------------------------------------- */}
            {profileTab[1] && 
            <div className = "content2">
                {/* {popUp && <PopUp setPopUp={setPopUp} getTotalPaid={totalPaid} />} */}
                <div className="tab_one">
                    <label>
                        <div className='img_border'>
                            <img className='img-wrap' src={Profile_Dog}/>
                        </div>  
                        {/* <input id="photo-upload" type="file" onChange={this.handleInputChange}/>  */}
                    </label>
                    <div className="profile_bar"> 
                            <div className="SidebarList">
                                    <li onClick={() => profileSwitch(1)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">บัญชีของฉัน</div>                                                                 
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title" style={{color: "#ED8E82" }}>สนใจ</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(3)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ร้านค้าของฉัน</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(4)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สถานะการชำระเงิน</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ออกจากระบบ</div>                          
                                    </li>
                            </div>
                            <div className='sell-pane'>
                                <button class="sell-button" onClick={() => showPopUp('Sell')}>
                                    + ลงขาย
                                </button>
                            </div>
                    </div>
                </div>
                <div className='like_page'>
                    {likeTab[0] &&
                        <div className='temp-money-pane'>
                            <div className='money-tab'>
                                <text className='money-header-selected'>ทั้งหมด</text>
                                <text className='money-header' onClick={() => likeSwitch(2)}>รอการตอบรับ</text>
                                <text className='money-header' onClick={() => likeSwitch(3)}>ตอบรับแล้ว</text>
                            </div>
                            <div className='cards_all'>    
                                <div className='cards__container'>  
                                    <div className="row_img">                        
                                        {CardItem_Accept.map((val,key)=> {
                                            return(
                                                    <div className='cards__wrapper' key={key}>
                                                        <div className="img_wrapper" onClick={() => showPopUpDog('Dog')}>
                                                            <div className="img_list">{val.imgName}</div> 
                                                            <div className="img_text_bottom">
                                                                <text>{val.breed}</text>
                                                                <text>{'ราคา :' + ' ' + val.cost}</text>
                                                                <text>{'สถานะ :' + ' ' + val.status}</text>
                                                                <div className='icon_details'>{val.icon}</div>
                                                            </div> 
                                                        </div>
                                                    </div>
                                            );
                                        })}
                                        {CardItem_Wait.map((val,key)=> {
                                            return(
                                                    <div className='cards__wrapper' key={key}>
                                                        <div className="img_wrapper" onClick={() => showPopUpDog('Dog')} >
                                                            <div className="img_list">{val.imgName}</div> 
                                                            <div className="img_text_bottom">
                                                                <text>{val.breed}</text>
                                                                <text>{'ราคา :' + ' ' + val.cost}</text>
                                                                <text>{'สถานะ :' + ' ' + val.status}</text>
                                                                <div className='icon_details'>{val.icon}</div>
                                                            </div> 
                                                        </div>
                                                    </div>
                                            
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    }
                    {likeTab[1] &&
                        <div className='temp-money-pane'>
                            <div className='money-tab'>
                                <text className='money-header' onClick={() => likeSwitch(1)} >ทั้งหมด</text>
                                <text className='money-header-selected'>รอการตอบรับ</text>
                                <text className='money-header' onClick={() => likeSwitch(3)}>ตอบรับแล้ว</text>
                            </div>
                            <div className='cards_all'>    
                                <div className='cards__container'>  
                                    <div className="row_img">                        
                                        {CardItem_Wait.map((val,key)=> {
                                            return(
                                                <div className='cards__wrapper' key={key}>
                                                    <div className="img_wrapper" onClick={() => showPopUpDog('Dog')}>
                                                        <div className="img_list">{val.imgName}</div> 
                                                        <div className="img_text_bottom">
                                                            <text>{val.breed}</text>
                                                            <text>{'ราคา :' + ' ' + val.cost}</text>
                                                            <text>{'สถานะ :' + ' ' + val.status}</text>
                                                            <div className='icon_details'>{val.icon}</div>
                                                        </div> 
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    }
                    {likeTab[2] &&
                        <div className='temp-money-pane'>
                            <div className='money-tab'>
                                <text className='money-header' onClick={() => likeSwitch(1)} >ทั้งหมด</text>
                                <text className='money-header' onClick={() => likeSwitch(2)}>รอการตอบรับ</text>
                                <text className='money-header-selected'>ตอบรับแล้ว</text>
                            </div>
                            <div className='cards_all'>    
                                <div className='cards__container'>  
                                    <div className="row_img">                        
                                        {CardItem_Accept.map((val,key)=> {
                                            return(
                                                <div className='cards__wrapper' key={key}>
                                                    <div className="img_wrapper" onClick={() => showPopUpDog('Dog')}>
                                                        <div className="img_list">{val.imgName}</div> 
                                                        <div className="img_text_bottom">
                                                            <text>{val.breed}</text>
                                                            <text>{'ราคา :' + ' ' + val.cost}</text>
                                                            <text>{'สถานะ :' + ' ' + val.status}</text>
                                                            <div className='icon_details'>{val.icon}</div>
                                                        </div> 
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>}

{/* -----------------------------------------------STORE PAGE----------------------------------------------------------------  */}
            {profileTab[2] && 
            <div className = "content2">
                {/* {popUp && <PopUp setPopUp={setPopUp} getTotalPaid={totalPaid} />} */}
                <div className="tab_one">
                    <label>
                        <div className='img_border'>
                            <img className='img-wrap' src={Profile_Dog}/>
                        </div>  
                        {/* <input id="photo-upload" type="file" onChange={this.handleInputChange}/>  */}
                    </label>
                    <div className="profile_bar"> 
                            <div className="SidebarList">
                                    <li onClick={() => profileSwitch(1)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">บัญชีของฉัน</div>                                                                 
                                    </li>
                                    <li onClick={() => profileSwitch(2)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สนใจ</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title" style={{color: "#ED8E82" }}>ร้านค้าของฉัน</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(4)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สถานะการชำระเงิน</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ออกจากระบบ</div>                          
                                    </li>
                            </div>
                            <div className='sell-pane'>
                                <button class="sell-button" onClick={() => showPopUp('Sell')}>
                                    + ลงขาย
                                </button>
                            </div>
                    </div>
                </div>
                <div className='store_page'>
                    {storeTab[0] &&
                        <div className='temp-money-pane'>
                            <div className='money-tab'>
                                <text className='money-header-selected'>กำลังขาย</text>
                                <text className='money-header' onClick={() => storeSwitch(2)}>ขายแล้ว</text>
                            </div>
                            <div className='cards_all'>
                                <div className='cards__container'>
                                    <div className="row_img">
                                        {CardStoreSell.map((val,key)=> {
                                            return( 
                                                <div className='cards__wrapper' key={key}>
                                                    <div className="img_wrapper" onClick={() => profileSwitch(6)}>
                                                        <div className="img_list">{val.imgName}</div>                                                                                                                                 
                                                        <div className="img_text_bottom">
                                                            <text>{val.breed}</text>
                                                            <text>{'ราคา :' + ' ' + val.cost}</text>
                                                            <text>{'จำนวนคนสนใจ :' + ' ' + val.like}</text>
                                                        </div> 
                                                    </div>
                                                </div>        
                                            );
                                        })} 
                                    </div>
                                </div>
                            </div>
                    </div>
                    }
                    {storeTab[1] &&
                        <div className='temp-money-pane'>
                            <div className='money-tab'>
                                <text className='money-header' onClick={() => storeSwitch(1)} >กำลังขาย</text>
                                <text className='money-header-selected'>ขายแล้ว</text>
                            </div>
                            <div className='cards_all'>
                                <div className='cards__container'>
                                    <div className="row_img">
                                        {CardStoreSold.map((val,key)=> {
                                            return( 
                                                <div className='cards__wrapper' key={key}>
                                                    <div className="img_wrapper" onClick={() => profileSwitch(6)}>
                                                        <div className="img_list">{val.imgName}</div> 
                                                        <div className="img_text_bottom">
                                                            <text>{val.breed}</text>
                                                            <text>{'ราคา :' + ' ' + val.cost}</text>
                                                            <text>{'จำนวนคนสนใจ :' + ' ' + val.like}</text>
                                                        </div> 
                                                    </div>
                                                </div>        
                                            );
                                        })} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        }

{/* -----------------------------------------------PAYMENT PAGE---------------------------------------------------------------- */}
            {profileTab[3] && 
            <div className = "content2">
                {/* {popUp && <PopUp setPopUp={setPopUp} getTotalPaid={totalPaid} />} */}
                <div className="tab_one">
                    <label>
                        <div className='img_border'>
                            <img className='img-wrap' src={Profile_Dog}/>
                        </div>  
                        {/* <input id="photo-upload" type="file" onChange={this.handleInputChange}/>  */}
                    </label>
                    <div className="profile_bar"> 
                            <div className="SidebarList">
                                    <li onClick={() => profileSwitch(1)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">บัญชีของฉัน</div>                                                                 
                                    </li>
                                    <li onClick={() => profileSwitch(2)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สนใจ</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(3)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ร้านค้าของฉัน</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title" style={{color: "#ED8E82" }}>สถานะการชำระเงิน</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ออกจากระบบ</div>                          
                                    </li>
                            </div>
                            <div className='sell-pane'>
                                <button class="sell-button" onClick={() => showPopUp('Sell')}>
                                    + ลงขาย
                                </button>
                            </div>
                    </div>
                </div>
                <div className='payment'>
                            {moneyTab[0] &&
                                <div className='temp-money-pane'>
                                    <div className='money-tab'>
                                        <text className='money-header-selected'>ที่ต้องชำระ</text>
                                        <text className='money-header' onClick={() => moneySwitch(2)}>ชำระแล้ว</text>
                                        <text className='money-header' onClick={() => moneySwitch(3)}>ยกเลิก</text>
                                    </div>
                                    <div className='money-info-pane'>
                                        <div className='money-table-row'>
                                            <div class='col1-tools-header' />
                                            <div class='col2-pic-header' />
                                            <div className='col3-name-header'><div class='.center-div-black'>สุนัข</div></div>
                                            <div className='col4-price-header'><div class='.center-div-black'>ราคา</div></div>
                                            <div className='col5-amount-header'><div class='.center-div-black'>จำนวน</div></div>
                                            <div className='col6-total-header'><div class='.center-div-black'>ทั้งหมด</div></div>
                                        </div>
                                        {notPaidDogData.map(each => {
                                            return (
                                                <div className='money-table-row'>
                                                    <div class='col1-tools' onClick={() => cancelPaidDog(each)}>X</div>
                                                    <div class='col2-pic'><img className='money-table-pic' src={each.picture} /></div>
                                                    <div className='col3-name'><div className='.center-div-black'>{each.name}</div></div>
                                                    <div className='col4-price'><div className='.center-div-pink'>{each.price}</div></div>
                                                    <div className='col5-amount'><div className='.center-div-black'>{each.amount}</div></div>
                                                    <div className='col6-total'><div className='.center-div-pink'>{each.amount * each.price}</div></div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='money-info-pane-bottom'>
                                        <div className='money-table-row'>
                                            <div class='money-bottom-blog'>ยอดชำระ</div><div className='money-bottom-value'>{totalPaid}</div>
                                        </div>
                                        <div className='money-table-row'>
                                            <div class='money-bottom-blog'>ยอดชำระทั้งหมด</div><div className='money-bottom-value'>{totalPaid}</div>
                                        </div>

                                    </div>
                                    <div className='money-pane'>
                                        <button class="money-button" onClick={() => showPopUpsell('Sell')}>
                                            ซื้อสุนัข
                                        </button>
                                    </div>
                                </div>}

                            {moneyTab[1] && <div className='temp-money-pane'>
                                <div className='money-tab'>
                                    <text className='money-header' onClick={() => moneySwitch(1)}>ที่ต้องชำระ</text>
                                    <text className='money-header-selected'>ชำระแล้ว</text>
                                    <text className='money-header' onClick={() => moneySwitch(3)}>ยกเลิก</text>
                                </div>
                                <div className='money-info-pane'>
                                    <div className='money-table-row'>
                                        <div class='col1-tools-header' />
                                        <div class='col2-pic-header' />
                                        <div className='col3-name-header'><div class='.center-div-black'>สุนัข</div></div>
                                        <div className='col4-price-header'><div class='.center-div-black'>ราคา</div></div>
                                        <div className='col5-amount-header'><div class='.center-div-black'>จำนวน</div></div>
                                        <div className='col6-total-header'><div class='.center-div-black'>ทั้งหมด</div></div>
                                    </div>
                                    {paidDogData && paidDogData.map(each => {
                                        return (
                                            <div className='money-table-row'>
                                                <div class='col1-tools' />
                                                <div class='col2-pic'><img className='money-table-pic' src={each.picture} /></div>
                                                <div className='col3-name'><div className='.center-div-black'>{each.name}</div></div>
                                                <div className='col4-price'><div className='.center-div-pink'>{each.price}</div></div>
                                                <div className='col5-amount'><div className='.center-div-black'>{each.amount}</div></div>
                                                <div className='col6-total'><div className='.center-div-pink'>{each.amount * each.price}</div></div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='money-pane'/>
                            </div>}

                            {moneyTab[2] && <div className='temp-money-pane'>
                                <div className='money-tab'>
                                    <text className='money-header' onClick={() => moneySwitch(1)}>ที่ต้องชำระ</text>
                                    <text className='money-header' onClick={() => moneySwitch(2)}>ชำระแล้ว</text>
                                    <text className='money-header-selected' >ยกเลิก</text>
                                </div>
                                <div className='money-info-pane'>
                                    <div className='money-table-row'>
                                        <div class='col1-tools-header' />
                                        <div class='col2-pic-header' />
                                        <div className='col3-name-header'><div class='.center-div-black'>สุนัข</div></div>
                                        <div className='col4-price-header'><div class='.center-div-black'>ราคา</div></div>
                                        <div className='col5-amount-header'><div class='.center-div-black'>จำนวน</div></div>
                                        <div className='col6-total-header'><div class='.center-div-black'>ทั้งหมด</div></div>
                                    </div>
                                    {(canceledPaidDog.length>0) && canceledPaidDog.map(each => {
                                        return (
                                            <div className='money-table-row'>
                                                <div class='col1-tools' onClick={() => delCanceledPaidDog(each)}>X</div>
                                                <div class='col2-pic'><img className='money-table-pic' src={each.picture} /></div>
                                                <div className='col3-name'><div className='.center-div-black'>{each.name}</div></div>
                                                <div className='col4-price'><div className='.center-div-pink'>{each.price}</div></div>
                                                <div className='col5-amount'><div className='.center-div-black'>{each.amount}</div></div>
                                                <div className='col6-total'><div className='.center-div-pink'>{each.amount * each.price}</div></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>}
                </div> 
            </div>}
            
{/* -----------------------------------------------EDIT ACCOUNT PROFILE PAGE---------------------------------------------------------------- */}
            {profileTab[4] && 
            <div className = "content2">
                {/* {popUp && <PopUp setPopUp={setPopUp} getTotalPaid={totalPaid} />} */}
                <div className="tab_one">
                    <label>
                        <div className='img_border'>
                            <img className='img-wrap' src={Profile_Dog}/>
                        </div>  
                        {/* <input id="photo-upload" type="file" onChange={this.handleInputChange}/>  */}
                    </label>
                    <div className="profile_bar"> 
                            <div className="SidebarList">
                                    <li onClick={() => profileSwitch(1)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title" style={{color: "#ED8E82" }}>บัญชีของฉัน</div>                                                                 
                                    </li>
                                    <li onClick={() => profileSwitch(2)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สนใจ</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(3)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ร้านค้าของฉัน</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(4)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สถานะการชำระเงิน</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ออกจากระบบ</div>                          
                                    </li>
                            </div>
                            {/* <div className='sell-pane'>
                                <button class="sell-button" onClick={() => showPopUp('Sell')}>
                                    + ลงขาย
                                </button>
                            </div> */}
                    </div>
                </div>
                <div className='account_details_edit'>

                    <div className = "head_topic">
                        <p>รายละเอียดบัญชี</p>
                    </div>

                        <div className ="Account_Text">
                            <div id="name">
                                <p>ชื่อผู้ใช้งาน</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ชื่อ-นามสกุล</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>อีเมล</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>เบอร์โทรศัพท์</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>วันเกิด</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>เพศ</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text"></input>
                        </div>

                    <div className = "head_topic">
                        <p>รายละเอียดที่อยู่</p>
                    </div>

                        <div className ="Account_Text">
                            <div id="name">
                                <p>ที่อยู่</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ถนน</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ตำบล</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>อำเภอ</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>จังหวัด</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>รหัสไปรษณีย์</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>

                    <div className = "head_topic">
                        <p>เปลี่ยนรหัสผ่าน</p>
                    </div>

                        <div className ="Account_Text">
                            <div id="name">
                                <p>รหัสเดิม</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>รหัสผ่านใหม่</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                        <div className ="Account_Text">
                            <div  id="name">
                                <p>ยืนยันรหัสผ่าน</p>           
                            </div> 
                            <input type="text" value="" placeholder={Account} id="text_edit"></input>
                        </div>
                    
                    <div className='Edit2-pane'>
                        <button class="Edit2-button" onClick={() => profileSwitch(1)}>
                            บันทึก
                        </button>
                        <button class="Edit2-button" onClick={() => profileSwitch(1)}>
                            ยกเลิก
                        </button>
                    </div>
                            {/* <div className='sell-pane'>
                                <button class="sell-button" onClick={() => showPopUp('Sell')}>
                                    + ลงขาย
                                </button>
                            </div> */}

                </div>                
            </div>}


{/* -----------------------------------------------EDIT STORE PROFILE PAGE---------------------------------------------------------------- */}

            {profileTab[5] && 
            <div className = "content2">
                {/* {popUp && <PopUp setPopUp={setPopUp} getTotalPaid={totalPaid} />} */}
                <div className="tab_one">
                    <label>
                        <div className='img_border'>
                            <img className='img-wrap' src={Profile_Dog}/>
                        </div>  
                        {/* <input id="photo-upload" type="file" onChange={this.handleInputChange}/>  */}
                    </label>
                    <div className="profile_bar"> 
                            <div className="SidebarList">
                                    <li onClick={() => profileSwitch(1)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">บัญชีของฉัน</div>                                                                 
                                    </li>
                                    <li onClick={() => profileSwitch(2)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สนใจ</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(3)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title" style={{color: "#ED8E82" }}>ร้านค้าของฉัน</div>                          
                                    </li>
                                    <li onClick={() => profileSwitch(4)} className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">สถานะการชำระเงิน</div>                          
                                    </li>
                                    <li className ="row">
                                            <div id="icon"><ArrowForwardIosIcon style={{ fontSize: 18 }}/></div> 
                                            <div id="title">ออกจากระบบ</div>                          
                                    </li>
                            </div>
                    </div>
                </div>
                    <div className='temp-money-pane'>
                        {CardStoreSell.map((val,key)=> {
                            return( 
                                    <div className="store_page2">
                                        <div className="Dog_box">
                                            <div className="Dog_card">
                                                <div className="img_dog">{val.imgName2}</div>  
                                                <div className="img_dog_details">
                                                    <div className="img_dog_small">{val.imgdetail1}</div>
                                                    <div className="img_dog_small">{val.imgdetail2}</div>  
                                                    <div className="img_dog_small">{val.imgdetail3}</div>
                                                </div>
                                            </div>
                                            <div className="Text_card">
                                                <div className="cancel" onClick={() => profileSwitch(3)}><CancelIcon className="C_hover" style={{ fontSize: 70 }}/></div>
                                                <div className="garantee">{val.garantee}</div>
                                                <div className="text_card_text1">{val.breed}</div>
                                                <div className="text_card_text2">{'ราคา :' +' '+ val.cost}</div>
                                                <div className="text_card_text1">{'เพศ :' +' '+val.sex}</div>
                                                <div className="text_card_text1">{'อายุ :' +' '+val.age}</div>
                                                <div className="text_card_text1">{'รายละเอียด :' }</div>
                                                <div className="text_card_text3">{val.details}</div>
                                                <div className="text_card_text4">{'ลงขายเมื่อวันที่ :' +' '+val.date}</div>
                                                
                                            </div>
                                        </div>
                                        {likeNameTab[0] &&
                                            <div className="like_card">
                                                 <div className="like_button_box">
                                                    <button className="like_button_details_selected" onClick={() => likeNameSwitch(1)}>
                                                        คนสนใจ
                                                    </button>
                                                    <button className="like_button_details" onClick={() => likeNameSwitch(2)}>
                                                        ยอมรับ
                                                    </button>
                                                    <button className="like_button_details" onClick={() => likeNameSwitch(3)}>
                                                        ยกเลิก
                                                    </button>
                                                </div>
                                                <div className="like_card_details">
                                                    <div className="Text_like_all">{'จำนวน' +' '+ val.like +' '+'คนสนใจ'}</div>
                                                    {UserLike.map((val,key)=> {
                                                        return( 
                                                            <div className="block_user">
                                                                <div className="img_block_user_detail">{val.pic_user}</div>
                                                                <div className="name_block_user_detail">{val.user_like}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        }
                                        {likeNameTab[1] &&
                                            <div className="like_card">
                                                <div className="like_button_box">
                                                    <button className="like_button_details" onClick={() => likeNameSwitch(1)}>
                                                        คนสนใจ
                                                    </button>
                                                    <button className="like_button_details_selected" onClick={() => likeNameSwitch(2)}>
                                                        ยอมรับ
                                                    </button>
                                                    <button className="like_button_details" onClick={() => likeNameSwitch(3)}>
                                                        ยกเลิก
                                                    </button>
                                                </div>
                                                <div className="like_card_details">
                                                    <div className="Text_like_all">{'จำนวน' +' '+ val.like +' '+'คนสนใจ'}</div>
                                                    {UserAccept.map((val,key)=> {
                                                        return( 
                                                            <div className="block_user">
                                                                <div className="img_block_user_detail">{val.pic_user}</div>
                                                                <div className="name_block_user_detail">{val.user_like}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        }
                                        {likeNameTab[2] &&
                                            <div className="like_card">
                                                <div className="like_button_box">
                                                    <button className="like_button_details" onClick={() => likeNameSwitch(1)}>
                                                        คนสนใจ
                                                    </button>
                                                    <button className="like_button_details" onClick={() => likeNameSwitch(2)}>
                                                        ยอมรับ
                                                    </button>
                                                    <button className="like_button_details_selected" onClick={() => likeNameSwitch(3)}>
                                                        ยกเลิก
                                                    </button>
                                                </div>
                                                <div className="like_card_details">
                                                    <div className="Text_like_all">{'จำนวน' +' '+ val.like +' '+'คนสนใจ'}</div>
                                                    {UserCancel.map((val,key)=> {
                                                        return( 
                                                            <div className="block_user">
                                                                <div className="img_block_user_detail">{val.pic_user}</div>
                                                                <div className="name_block_user_detail">{val.user_like}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        }
                                    </div>
                            );
                        })}
                    </div>
            </div>}
            {popUp && <PopUp setPopUp={setPopUp} getTotalPaid={totalPaid} />}
    </div>
    );
}


export default Profile

// create a form with the following fields:
// 1. dropdown with district names list
// 2. dropdown with crop names list
// 3. dropdown with season names list
// 4. text input for area with minimum value of 1 and max value 300
// 5. a button to submit the form which would send the data to the server
// with url : https://mlagrohelp-xipqzrlqna-el.a.run.app/yield
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export default function PredictPage({ user }) {
    let District_Name= {
        "agra": 0,
        "aligarh": 1,
        "allahabad": 2,
        "ambedkar nagar": 3,
        "amethi": 4,
        "amroha": 5,
        "auraiya": 6,
        "azamgarh": 7,
        "baghpat": 8,
        "bahraich": 9,
        "ballia": 10,
        "balrampur": 11,
        "banda": 12,
        "barabanki": 13,
        "bareilly": 14,
        "basti": 15,
        "bijnor": 16,
        "budaun": 17,
        "bulandshahr": 18,
        "chandauli": 19,
        "chitrakoot": 20,
        "deoria": 21,
        "etah": 22,
        "etawah": 23,
        "faizabad": 24,
        "farrukhabad": 25,
        "fatehpur": 26,
        "firozabad": 27,
        "gautam buddha nagar": 28,
        "ghaziabad": 29,
        "ghazipur": 30,
        "gonda": 31,
        "gorakhpur": 32,
        "hamirpur": 33,
        "hapur": 34,
        "hardoi": 35,
        "hathras": 36,
        "jalaun": 37,
        "jaunpur": 38,
        "jhansi": 39,
        "kannauj": 40,
        "kanpur dehat": 41,
        "kanpur nagar": 42,
        "kasganj": 43,
        "kaushambi": 44,
        "kheri": 45,
        "kushi nagar": 46,
        "lalitpur": 47,
        "lucknow": 48,
        "maharajganj": 49,
        "mahoba": 50,
        "mainpuri": 51,
        "mathura": 52,
        "mau": 53,
        "meerut": 54,
        "mirzapur": 55,
        "moradabad": 56,
        "muzaffarnagar": 57,
        "pilibhit": 58,
        "pratapgarh": 59,
        "rae bareli": 60,
        "rampur": 61,
        "saharanpur": 62,
        "sambhal": 63,
        "sant kabeer nagar": 64,
        "sant ravidas nagar": 65,
        "shahjahanpur": 66,
        "shamli": 67,
        "shravasti": 68,
        "siddharth nagar": 69,
        "sitapur": 70,
        "sonbhadra": 71,
        "sultanpur": 72,
        "unnao": 73,
        "varanasi": 74
    }
    let Seasons = {
        "kharif     ": 0, 
        "rabi       ": 1,
        "summer     ": 2, 
        "whole year ": 3
    }
    let Crops = {
        "arhar/tur": 0,
        "bajra": 1,
        "banana": 2,
        "barley": 3,
        "castor seed": 4,
        "coriander": 5,
        "cotton(lint)": 6,
        "dry chillies": 7,
        "dry ginger": 8,
        "garlic": 9,
        "ginger": 10,
        "gram": 11,
        "groundnut": 12,
        "guar seed": 13,
        "jowar": 14,
        "jute": 15,
        "linseed": 16,
        "maize": 17,
        "masoor": 18,
        "moong(green gram)": 19,
        "moth": 20,
        "oilseeds total": 21,
        "onion": 22,
        "other  rabi pulses": 23,
        "other kharif pulses": 24,
        "peas & beans (pulses)": 25,
        "potato": 26,
        "ragi": 27,
        "rapeseed &mustard": 28,
        "rice": 29,
        "sannhamp": 30,
        "sesamum": 31,
        "small millets": 32,
        "soyabean": 33,
        "sugarcane": 34,
        "sunflower": 35,
        "sweet potato": 36,
        "tobacco": 37,
        "total foodgrain": 38,
        "turmeric": 39,
        "urad": 40,
        "wheat": 41
    }
    
    const [district, setDistrict] = useState("");
    const [crop, setCrop] = useState("");
    const [season, setSeason] = useState("");
    const [area, setArea] = useState("");
    const [prediction, setPrediction] = useState(null);

    const handleClose = () => {
        setDistrict("");
        setCrop("");
        setSeason("");
        setArea("");
        setPrediction(null);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        //check if area has valid input
        // check if any fields are empty or not
        if (district === "" || crop === "" || season === "" || area === "") {
            alert("Please fill all the fields");
        }
        else if (area < 1 || area > 300) {
            alert("Please enter a valid area between 1 to 300");
        }

        const data = {
            district_name: District_Name[district],
            crop: Crops[crop],
            season: Seasons[season],
            area: Number(area)
        }
        console.log(data)
        axios.post("https://mlagrohelp-xipqzrlqna-el.a.run.app/yeild", data)
            .then(res => {
                setPrediction(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    



    return (
        prediction === "" || prediction === null || prediction === undefined ?
        <div className="container" style={{marginTop: "40px"}} >
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">Yield Prediction</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <label>District</label>
                            <select className="form-control" onChange={(e) => setDistrict(e.target.value)}>
                                <option value="">Select District</option>
                                {Object.keys(District_Name).map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>   
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group p-2">
                            <label>Crop</label>
                            <select className="form-control" onChange={(e) => setCrop(e.target.value)}>
                                <option value="">Select Crop</option>
                                {Object.keys(Crops).map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group p-2">
                            <label>Season</label>
                            <select className="form-control" onChange={(e) => setSeason(e.target.value)}>
                                <option value="">Select Season</option>
                                {Object.keys(Seasons).map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group p-2">
                            <label>Area (in hector)</label>
                            <input type="text" className="form-control" onChange={(e) => setArea(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Predict</button>
                    </form>
                    {/* <h3 className="text-center">{prediction}</h3> */}
                </div>
            </div>
        </div>
        :
        <div className="container" style={{marginTop: "40px"}} >
            <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">Yield Prediction</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group p-2">
                            <label>District</label>
                            <h4>{district}</h4>
                        </div>
                        <div className="form-group p-2">
                            <label>Crop</label>
                            <h4>{crop}</h4>
                        </div>
                        <div className="form-group p-2">
                            <label>Season</label>
                            <h4>{season}</h4>
                        </div>
                        <div className="form-group p-2">
                            <label>Area</label>
                            <h4>{area + " hectors"}</h4>
                        </div>
                        
                    </form>
                    {/* <h3 className="text-center">{prediction}</h3> */}
                </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Predicted Yield</h2>
                    <h3 className="text-center">{prediction.production + " tons"}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <button type="submit" className="btn btn-primary btn-block" onClick={handleClose}>Close</button>
                </div>
            </div>

        </div>
    )
}


import React from 'react'
import {useForm} from 'react-hook-form'
import './dishes.css'
import axios from 'axios'


export default function DishesForm() {

    const {register, handleSubmit} = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        try {
            console.log("Sending successed!")
            await axios.post('https://frosty-wood-6558.getsandbox.com:443/dishes', JSON.stringify(data))
        }
        catch(err) {
            console.log("error occured!")
            console.log(err)
        }
    }
        

    function addInput(type) {
        if(type === "pizza") {
            document.getElementById("spiciness_scale").type = "hidden"
            document.getElementById("slices_of_bread").type = "hidden"
            document.getElementById("no_of_slices").type = "number"
            document.getElementById("diameter").type = "float"
        }
        else if(type === "soup") {
            document.getElementById("spiciness_scale").type = "number"
            document.getElementById("slices_of_bread").type = "hidden"
            document.getElementById("no_of_slices").type = "hidden"
            document.getElementById("diameter").type = "hidden"
        }
        else if(type === "sandwich") {
            document.getElementById("slices_of_bread").type = "number"
            document.getElementById("spiciness_scale").type = "hidden"
            document.getElementById("no_of_slices").type = "hidden"
            document.getElementById("diameter").type = "hidden"
        }
    }

    return (
        <div className="theDishes">
            <form onSubmit={handleSubmit(onSubmit)} id="theForm">
                <div>
                    <div className="label"><label htmlFor="name">Name</label></div>
                    <input required id="name" type="text" {...register("name")}/>
                </div>
                <div>
                    <div className="label"><label htmlFor="preparation_time">Preparation Time</label></div>
                    <input required id="preparation_time" valueasdate={Date.toString()} {...register("preparation_time")} type="duration"/>

                </div>
                <div>
                    <div className="label"><label htmlFor="type">Type</label></div>
                    <select required id="type" type="text" {...register("type")} onChange={(e) => {
                        console.log(e.target.value)
                        addInput(e.target.value)
                    }}>
                        <option value="select" default></option>
                        <option value="pizza">pizza</option>
                        <option value="soup">soup</option>
                        <option value="sandwich">sandwich</option>
                    </select>
                </div>
                <div id="otherInputs">
                    <input required id="no_of_slices" type="hidden" placeholder="# of slices" min="1" {...register("no_of_slices")}/>
                    <input required id="diameter" type="hidden" placeholder="Diameter" min="0" step="0.1" {...register("diameter")}/>
                    <input required id="spiciness_scale" type="hidden" placeholder="Spiciness scale" min="1" max="10" {...register("spiciness_scale")}/>
                    <input required id="slices_of_bread" type="hidden" placeholder="Slices of bread" min="0" {...register("slices_of_bread")}/>
                </div>
                <button>Send data</button>
            </form>
        </div>
    )    
}


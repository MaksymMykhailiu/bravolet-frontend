"use client";
import axios from "axios";
import { 
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter, 
    CardHeader,
    Dialog,
    IconButton,
    Input,
    Spinner,
    Tab,
    Tooltip,
    Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon  } from "@heroicons/react/24/outline"
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'

const config = require("../../../config")

const TABLE_HEAD = ["No", "Name", "Category", "Decription", "Applied Properties", "Created", "Updated",""]
const toast_setting = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
}

const timeFormater = (timestamp) => {
    const date = new Date(timestamp);
    const formated = `${date.toLocaleDateString()}`; // </br> ${date.toLocaleTimeString()}
    return formated
}

export default function Policy(){
    const [data, setData] = useState([]);
    const [originData, setOriginData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [openEdit, setEdit] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isCreate, setCreate] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios.get(config.BACKEND+"/policy/")
            .then((response) => {
                if(response.status == 200){
                    setOriginData(response.data.result);
                    setData(response.data.result);
                    toast.success('Policy is loaded successfuly!', toast_setting);
                }
                else{
                    toast.error('Something went wrong!', toast_setting);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong!', toast_setting);
            })
            .finally(()=>{
                setLoading(false);
            })
    }, [])

    const handleEdit = (data=null) => {
        if(openEdit){
            setEdit(false);
            return ;
        }
        else {
            setSelected(data);
            setEdit(true);
        }
    }

    const handleUpdate = () => {
        axios.get(config.BACKEND+"/policy/")
            .then((response) => {
                if(response.status == 200){
                    setOriginData(response.data.result);
                    setData(response.data.result);
                }
                else{
                    toast.error('Something went wrong!', toast_setting);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong!', toast_setting);
            })
    }

    const handleDelete = () => {
        if(selected){
            axios.delete(config.BACKEND+`/policy/${selected.id}/`)
            .then(response => {
                if(response.status==200){
                    toast.success('Successfully deleted!', toast_setting);
                    handleUpdate();
                }
                else
                    toast.error('Something went wrong!', toast_setting)
            })
            .catch(error => {
                toast.error('Something went wrong!', toast_setting)
            })
            .finally(()=>{
                setEdit(false)
            })
        }
    }

    const handleSubmit = () => {
        setLoading(true)
        if(isCreate){
            const submitData = {
                name: document.getElementById('policy_name').value,
                category: document.getElementById('policy_cate').value,
                description: document.getElementById('policy_desc').value
            }
            axios.post(config.BACKEND+`/policy/`, submitData)
            .then(response=>{
                if(response.status==201){
                    toast.success('Successfully created!', toast_setting);
                    handleUpdate();
                }
                else{
                    toast.error('Something went wrong!', toast_setting)
                }
            })
            .catch(error=>{
                toast.error('Something went wrong!', toast_setting)
            })
            .finally(()=>{
                setEdit(false)
                setLoading(false)
            })
        }
        else {
            const submitData = {
                name: document.getElementById('policy_name').value,
                category: document.getElementById('policy_cate').value,
                description: document.getElementById('policy_desc').value
            }
            axios.put(config.BACKEND+`/policy/${selected.id}/`, submitData)
            .then(response=>{
                if(response.status==202){
                    toast.success('Change applied!', toast_setting);
                    handleUpdate();
                }
                else{
                    toast.error('Something went wrong!', toast_setting)
                }
            })
            .catch(error=>{
                toast.error('Something went wrong!', toast_setting)
            })
            .finally(()=>{
                setEdit(false)
                setLoading(false)
            })
        }
    }

    const handleSearch = (e) => {
        const keyword =  e.target.value
        let temp = []
        for(let i=0; i<originData.length; i++){
            if(JSON.stringify(originData[i]).toLowerCase().includes(keyword.toLowerCase())){
                temp.push(originData[i])
            }
        }
        setData(temp)
        if(keyword=="")setData(originData)
    }

    return (
        <>
            {
                isLoading? 
                    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 backdrop-blur-sm right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0">
                        <Spinner className="h-16 w-16 text-gray-900/50"/>
                    </div>
                    :<></>
            }
            <main className="flex w-full max-w-[65rem] flex-col items-center justify-between pt-12  mt-8">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Bravolet Polices
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    These are details about the Bravolet Polices.
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                        onChange={(e)=>handleSearch(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0 w-full">
                        <table className="w-full mix-w-max-table-auto text-left">
                            <thead>
                                <tr>
                                    {
                                        TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(({name, category, description, property, created_at, updated_at}, index) => {
                                        const isLast = index == data.length-1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={name}>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {index+1}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {category}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {description}
                                                    </Typography>
                                                </td>   
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {property.length}
                                                    </Typography>
                                                </td> 
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {timeFormater(created_at)}
                                                    </Typography>
                                                </td>     
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {timeFormater(updated_at)}
                                                    </Typography>
                                                </td>                                    
                                                <td className={`${classes} bg-blue-gray-50/50`}>
                                                    <Tooltip content="Edit Police">
                                                        <IconButton variant="text" onClick={()=>{setCreate(false);handleEdit(data[index]);}}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>                  
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </CardBody>
                    <div className="relative">
                        <div className="flex flex-col shrink-0 grow-0 justify-arount fixed bottom-0 right-5 rounded-lg mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10">
                            <IconButton variant="text" className="p-3 rounded-full" onClick={()=>{setCreate(true);handleEdit({});}}>
                                <PlusCircleIcon color="green" className="w-14 h-14" />
                            </IconButton>
                        </div>
                    </div>
                </Card>
            </main>
            { selected?
            <Dialog open={openEdit} handleEdit={()=>handleEdit({})} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            {isCreate?"Create Policy":"Edit Policy"}
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Edit Policy detail data here.
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Name
                        </Typography>
                        <Input label="Name" id="policy_name" size="lg" defaultValue={selected?.name}/>
                        <Typography className="-mb-2" variant="h6">
                            Category
                        </Typography>
                        <Input label="Categroy" id="policy_cate" size="lg" defaultValue={selected?.category}/>
                        <Typography className="-mb-2" variant="h6">
                            Description
                        </Typography>
                        <Input label="Description" id="policy_desc" size="lg" defaultValue={selected?.description}/>
                        {!isCreate? <><Typography className="-mb-2" variant="h6">
                            Created
                        </Typography>
                        <Input label="Created_at" size="lg" value={selected?.created_at} disabled/></>:<></>}
                    </CardBody>
                    <CardFooter className="flex justify-between">
                        <div className="flex gap-4">
                            <Button variant="gradient" color="green" onClick={handleSubmit}>
                                <span>Submit</span>
                            </Button>
                            <Button variant="text" color="red" onClick={()=>{setEdit(false)}}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                        { !isCreate?<div>
                        <Button variant="gradient" color="red" onClick={handleDelete}>
                            <span>Delete</span>
                        </Button></div>:<></>}
                    </CardFooter>
                </Card>
            </Dialog>:<></>
            }
            <ToastContainer />
        </>
    )
}
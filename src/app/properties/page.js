"use client";
import axios from "axios";
import { 
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter, 
    CardHeader,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Spinner,
    Tab,
    Tooltip,
    Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { PencilIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-tailwindcss-select';

import 'react-toastify/dist/ReactToastify.css'

const config = require("../../../config")
const TABLE_HEAD = ["No", "Picture", "Title", "Nickname",""]
const toast_setting = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,

}

const SelectContainer = ({children}) => {
    return (
        <div className='w-full mt-8 md:mt-10 flex items-center justify-center home-selector'>
            <div className='w-full md:w-full lg:w-full xl:w-3/4'>
                {children}
            </div>
        </div>
    )
}


export default function Property(){
    const [isLoading, setLoading] = useState(false);
    const [originData, setOriginData] = useState([]);
    const [data, setData] = useState([]);
    const [openEdit, setEdit] = useState(false);
    const [selected, setSelected] = useState({});
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);


    useEffect(() => {
        setLoading(true)       
        axios.get(config.BACKEND+"/policy/details/")
        .then((response) => {
            if(response.status == 200){
                setOriginData(response.data.result);
                setData(response.data.result);
                toast.success('Listing is fetched successfully!', toast_setting)
            }
            else{
                toast.error('Something went wrong!', toast_setting);
            }
        })
        .catch((error) => {
            toast.error('Something went wrong!', toast_setting);
        })
        .finally(()=>{        
            setLoading(false)
        })
               
        axios.get(config.BACKEND+"/policy/")
        .then((response) => {
            if(response.status == 200){
                const policyList = response.data.result
                const tempOption = []
                for(let i=0;i<policyList.length;i++){
                    tempOption.push({
                        value: policyList[i].id,
                        label: policyList[i].name,
                        disabled: false,
                    })
                }
                setOptions(tempOption)
            }
        })
        .catch((error) => {
            toast.error('Something went wrong!', toast_setting)
        })
    }, [])

    const handleEdit = (data=null) => {     
        if(openEdit){
            setEdit(false);
            // setSelected(null);
            return;
        }  
        axios.get(config.BACKEND+`/policy/${data.id}/listing/`)
        .then((response) => {
            if(response.status == 200){
                const valueList = response.data.result
                const tempValue = []
                for(let i=0;i<valueList.length;i++){
                    tempValue.push({
                        value: valueList[i].id,
                        label: valueList[i].description,
                        disabled: false
                    })
                }
                setValue(tempValue);
                setSelected(data);
                setEdit(!openEdit);
                toast.success('Policy setting is loaded', toast_setting)
            }
            else{
                toast.error('Something went wrong!', toast_setting)
            }
        })
        .catch((error) => {
            toast.error('Something went wrong!', toast_setting)
        })
    }

    const handleSubmit = () => {
        if(selected){
            const paylaod = []
            if(value){
                for(let i=0;i<value.length;i++){
                    paylaod.push(value[i].value)
                }
            }
            axios.put(config.BACKEND + `/policy/${selected.id}/edit/`, paylaod)
                .then((response) => {
                    if(response.status == 202){
                        toast.success('Policy setting is updated', toast_setting)
                    }
                    else{
                        toast.error('Something went wrong!', toast_setting)
                    }
                })
                .catch((error) => {
                    toast.error('Something went wrong!', toast_setting)
                })
                .finally(() => setEdit(false))
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
            <main className="flex w-full max-w-[65rem] flex-col items-center justify-between pt-12 mt-8">
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Bravolet Properties
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    These are details about the Bravolet Properties.
                                </Typography>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max  mt-1">
                                <div className="w-full md:w-72">
                                    <Input
                                        label="Search"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                        onChange={(e)=>handleSearch(e)}
                                    />           
                                    <Typography color="gray" className="mt-1 font-normal">
                                        Total found: {data.length}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
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
                                    data.map(({id, title, nickname, picture}, index) => {
                                        const isLast = index == data.length-1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={index}>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {index+1}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Avatar
                                                        src={picture}
                                                        alt={nickname}
                                                        size="xl"
                                                        className="border border-blue-gray-50 bg-blue-gray-50/50 p-1"
                                                    />
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {title}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {nickname}
                                                    </Typography>
                                                </td>                                
                                                <td className={`${classes} bg-blue-gray-50/50`}>
                                                    <Tooltip content="Edit Policy">
                                                        <IconButton variant="text" onClick={()=>handleEdit(data[index])}>
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
                </Card>
            </main>
            <Dialog open={openEdit} handler={()=>handleEdit({})}>
                <DialogHeader>Edit Properties Policy</DialogHeader>
                <DialogBody className="flex justify-center">
                    <Card
                        shadow={false}
                        className="relative grid w-full max-w-[28rem] items-end justify-center text-center"
                    >
                        <CardHeader
                            floated={false}
                            shadow={false}
                            color="transparent"
                            className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
                            style={{backgroundImage: `url(${selected.picture})`}}
                        >
                            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                        </CardHeader>
                        <CardBody className="relative py-14 px-6 md:px-12">
                            <Typography variant="h3" color="white" className="mb-4 font-medium leading-[1.5]"><span>{selected.title}</span></Typography>
                            <Typography variant="h5" className="mb-2 text-gray-400"><span>{selected.nickname}</span></Typography>
                            <SelectContainer>
                                <Select
                                    primaryColor='cyan'
                                    options={options}
                                    onChange={value => setValue(value)}
                                    value={value}
                                    loading={false}
                                    isClearable={false}
                                    isSearchable={true}
                                    isMultiple={true}
                                    isDisabled={false}
                                />
                            </SelectContainer>
                        </CardBody>
                    </Card>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={()=>handleEdit(null)} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={()=>handleSubmit()}>
                        <span>Submit</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </>
    )
}
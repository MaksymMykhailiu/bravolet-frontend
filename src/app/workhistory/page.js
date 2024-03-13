'use client';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import axios from 'axios';
import Link from 'next/link';

const config = require("../../../config")
const toast_setting = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
}

const TableFromArray = ( {header, body} ) => {
    return (
        <table className='table-auto w-full border-collapse border'>
            <thead>
                <tr>
                    {header.map((element, index)=> (<th key={index} className='border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-slate-400 dark:text-slate-200 text-left'>{element}</th>))}
                </tr>
            </thead>
            <tbody>
                {body.map((row, index)=>(
                    <tr key={index}>
                        {row.map((cell, idx)=>(<td key={idx} className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'>{cell}</td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}



const data_list = []
const WorkHistory = () => {
    //should be memoized or stable
    const [dataList, setDateList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const columns = useMemo(
        () => [
            {
                accessorKey: 'client_name', 
                header: 'Client Name',
                size: 50,
            },
            {
                accessorKey: 'question',
                header: 'Message',
                size: 250,
            },
            {
                accessorKey: 'reply', 
                header: 'Reply',
                size: 250,
            },
            {
                accessorKey: 'answered',
                header: 'Answered',
                size: 50,
                Cell: ({ renderedCellValue, row }) => (
                    <>
                    {
                        renderedCellValue ? <CheckCircleIcon color='green' width={24} />: <XCircleIcon color='red' width={24}/>
                    }
                    </>
                )
            },
            {
                id: 'timestamp',
                accessorKey: 'create_at',
                header: 'TimeStamp',
                size: 150,
            },
        ],
        [],
    );

    useEffect(() => {
        setLoading(true)       
        axios.get(config.BACKEND+"/chat/")
        .then((response) => {
            if(response.status == 200){
                setDateList(response.data.results);
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
    }, [])

    const table = useMaterialReactTable({
        columns,
        data: dataList, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        renderDetailPanel: ({ row }) => {
            if (row.original.table_style){

            }
            return <div className='flex flex-col gap-4'>
                <Link href={row.original.chat_url} target='_blank' className='font-bold hover:underline'>Talk to Client in Guesty.</Link>
                {
                    row.original.table_style ?
                    <TableFromArray header={row.original.table.header} body={row.original.table.body}/>:
                    <div>{row.original.summary}</div>
                }
            </div>
        },
        enableSorting: true,
        initialState: {
            sorting: [
                {
                    id: 'timestamp',
                    desc: true
                }
            ]
        }

    });

    return <div className='mt-40 max-w-[1024px]'>
        <MaterialReactTable table={table}/>
    </div>;
};

export default WorkHistory;
import React,{useState,useEffect} from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { Box, Typography, BaseCheckbox,loader,Alert } from '@strapi/design-system'

import axios from '../utils/axiosInstance';

const COL_COUNT = 5;
const ROW_COUNT = 5;

const Repo = () => {
 const[response,setRepos]=useState([]);
 const[loading,setloading]=useState([]);
 const[error,setError]=useState([]);
useEffect(async()=>{
    setloading(true);
    //fetchdata
    axios.get('github-project/repos')
    .then((response) =>setRepos(response.data))
    .catch((error)=>setError(error));
    setloading(false);
});
if(error)
return<Alert closeLabel="Close alert" title="Error fetching repositories" varient="danger">{error.toString()}.</Alert>
if(loading)return <loader />;

 return <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
            <Thead>
                <Tr>
                    <Th>
                        <BaseCheckbox aria-label="Select all entries" />
                    </Th>
                    <Th>
                        <Typography variant="sigma">Name</Typography>
                    </Th>
                    <Th>
                        <Typography variant="sigma">Description</Typography>
                    </Th>
                    <Th>
                        <Typography variant="sigma">Url</Typography>
                    </Th>
                    <Th>
                        <Typography variant="sigma">Actions</Typography>
                    </Th>
                    <Th>
                        <Typography variant="sigma">Contact</Typography>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {entries.map(entry => <Tr key={entry.id}>
                    <Td>
                        <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                    </Td>
                    <Td>
                        <Typography textColor="neutral800">{entry.id}</Typography>
                    </Td>
                    <Td>
                        <Avatar src={entry.cover} alt={entry.contact} />
                    </Td>
                    <Td>
                        <Typography textColor="neutral800">{entry.description}</Typography>
                    </Td>
                    <Td>
                        <Typography textColor="neutral800">{entry.category}</Typography>
                    </Td>
                    <Td>
                        <Typography textColor="neutral800">{entry.contact}</Typography>
                    </Td>
                    <Td>
                        <Flex>
                            <a href="https://www.google.com" target="_blank" rel="noreferrer">
                                G
                            </a>
                            <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                            <Box paddingLeft={1}>
                                <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                            </Box>
                        </Flex>
                    </Td>
                </Tr>)}
            </Tbody>
        </Table>
    </Box>;

}
export default Repo;
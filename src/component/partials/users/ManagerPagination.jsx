import { Box, Button, ListItem, UnorderedList } from '@chakra-ui/react'

export default function UserPagination({managersPerPage,totalManagers,currentPage , setCurrentPage}) {
    const pageNumbers = []

    for(let i = 1;i <= Math.ceil(totalManagers / managersPerPage);i++){
       pageNumbers.push(i)
    }

    const style_list = {
       marginTop:'10px',
       display:'flex',
       align:'center',
       justify:'center',
       listStyleType:'none',
       gap:'10px'
    }


 return (
   <Box>
       <UnorderedList sx={style_list}>
       {pageNumbers.map(
       (number) => (
           <ListItem key={number}>
           <Button
           colorScheme='teal'
           variant={currentPage === number ? 'solid' : 'outline'}
           onClick={()=> setCurrentPage(number)}
           >
               {number}
           </Button>
           </ListItem>
       )
    )}
       </UnorderedList>
   </Box>
 )
}


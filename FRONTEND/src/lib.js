import {
    FaHome as HomeIcon,
    FaShoppingCart as CartIcon,
    FaSearch as Search2Icon,
    FaList as OrdersIcon,
    FaRegAddressBook,
    FaCheck,
    FaMailBulk,

} from 'react-icons/fa'
import {CgSearchFound} from 'react-icons/cg'
import { AddIcon } from '@chakra-ui/icons'



export const getIcon = (link) => {
    switch(link) {
       case 'Found':
            return FaCheck
            case 'Lost':
                return Search2Icon

                case 'Create':
                    return AddIcon

                case 'Mail':
                    return FaMailBulk

        
    }
}


export const isAuthorized =(session)=> {
    if(session) {
        return true
    } else {
        return false
    }
}

export const trimString = (string, length) => {
    if(string.length > length) {
        return string.substring(0, length) + '...'
    } else {
        return string
    }
}


export const getImage = (product)=>{
    return product.image?.formats.thumbnail.url
}








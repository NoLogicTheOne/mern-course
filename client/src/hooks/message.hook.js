import { useCallback } from 'react'

function useMessage() {
    return useCallback(text => {
        if(text && window.M){
            window.M.toast({html: text})
        }
    }, [])
} 

export {useMessage}

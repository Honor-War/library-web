import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({   
    buttonText: 'Connect',
   
  })

  const ButtonText = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
  
    const truncate = (text, startChars, endChars, maxLength) => {
      if (text.length > maxLength) {
        var start = text.substring(0, startChars)
        var end = text.substring(text.length - endChars, text.length)
        while (start.length + end.length < maxLength) {
          start = start + '.'
        }
        return start + end
      }
      return text
    }
  
    return (truncate(accounts[0], 4, 4, 11));
  
    
  }

  export{
    setGlobalState,
    getGlobalState,
    useGlobalState
  }
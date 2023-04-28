import { ENS } from "@ensdomains/ensjs"
import { useEffect } from "react";
import { useCallback } from "react";
import { createContext, useContext } from "react";
import { useAccount, useProvider } from "wagmi";
// import { NameWrapperContract } from "../config/contract";
const ENSInstance = new ENS()
const EnsjsContent = createContext();

const EnsjsProdiver = ({ children}) => {
  const provider = useProvider()
  const {address} = useAccount()

  const getNames = useCallback(async () => {
    if (address) {
      console.log(ENSInstance)
      // all , resolvedAddress, owner, wrappedOwner
      const res = await ENSInstance.getNames({
        address: '0xd55d430222e66d6802015b6606745f199740581c',
        type: 'all'
      })
      console.log(res, 'res')
    }
  }, [address])

  const ensSetProvider = useCallback(async() => {
    try {
      await ENSInstance.setProvider(provider)
      getNames()
    } catch (error) {
      
    }
  }, [provider, getNames])

  useEffect(() => {
    ensSetProvider()
  }, [ensSetProvider])
  
  return (
    <EnsjsContent.Provider value={{}}>
      {children}
    </EnsjsContent.Provider>
  )
}

export const useENSJS = () => useContext(EnsjsContent);

export default EnsjsProdiver;
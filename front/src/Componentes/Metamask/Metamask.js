import { useState } from "react";
import stl from "../Metamask/Metamask.module.css";
import MetaMaskSDK from '@metamask/sdk';

export default function Metamask() {
    
    const [buttonText, setButtonText] = useState()
    const [account, setAccount] = useState(null)

    const options = {
        injectProvider: true,
        communicationLayerPreference: 'webrtc',
      };
    
    const MMSDK = new MetaMaskSDK(options);
    
    const ethereum = MMSDK.getProvider();
    
    function connectWallet() {
        if(ethereum && ethereum.isMetaMask) {
            ethereum.request({ method: 'eth_requestAccounts', params: [] });
        } else {
            setButtonText("Necesitas tener metamask instalado")
        }
    }

    return (
        
        <button className={stl.botonmetamask} onClick={connectWallet}>{buttonText}{account}</button>
      
    )
    }

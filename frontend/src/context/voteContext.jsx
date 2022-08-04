import { createContext } from "react";
import useProvider from "../hooks/useProvider";


const VoteContext = createContext({});

export function VoteProvider(props) {
    const voteProvider = useProvider()
    return (
        <VoteContext.Provider value={voteProvider}>{props.children}</VoteContext.Provider>
    )
}

export default VoteContext;
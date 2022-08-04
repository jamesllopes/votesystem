import { useContext } from "react";
import VoteContext from "../context/voteContext";

function useVote() {
    return useContext(VoteContext)
}

export default useVote;
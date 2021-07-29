import React, { useEffect, useState } from 'react'
import "./MG_GamePage.css"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Oppo_player(props) {
  const { player, Playing, host, playerBids, BidStatus, Index, } = props;
  useEffect(() => {
    console.log("map test", playerBids,Index, player);
  }, [Playing])

  return (
      Index % 2 == 0
        ? <div class="rocketTextLeft" >
            <span>
              {
                Playing ?
                  <div class="Bids">
                    {
                      playerBids[Index]?.map( (Bid,index) => 
                        (BidStatus[Index].activeIndex.includes(index)) ?
                        <span class="activeBid">{Bid}</span> :
                        <span class="inactiveBid">{Bid}</span>
                      )
                    }
                  </div>
                :
                null
              }
            </span>
          </div>
        : <div class="rocketTextRight" >
            <span>
              {
                Playing ?
                  <div class="Bids">
                    {
                      playerBids[Index]?.map( (Bid,index) => 
                        (BidStatus[Index].activeIndex.includes(index)) ?
                        <span class="activeBid">{Bid}</span> :
                        <span class="inactiveBid">{Bid}</span>
                      )
                    }
                  </div>
                :
                null
              }
            </span>
          </div>
  )
}

export default Oppo_player
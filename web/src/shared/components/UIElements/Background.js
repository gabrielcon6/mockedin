import React from 'react'
import Particles from 'react-particles-js';


const Background = () => {
        return (
            <Particles 
              params={{
            		particles: {
                  number:{
                    value:20,
                    density:{
                      enable: true,
                      value_area: 50
                    }
                  } 
                }
            	}}
              style={{
                  width: '100%',
                  height:'100%',
                  // position: 'fixed',
              }}
            >
            </Particles>
        );
    };

export default Background;
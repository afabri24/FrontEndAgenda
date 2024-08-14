import React, { useEffect, useRef } from 'react'
import { useAnimation, useInView, motion } from 'framer-motion'
import { fadeInText, fadeInText2, style, transitionText, transitionText2 } from './fades'

function  TransitionText({children}) {
    const ref = useRef(null)
    const isInView = useInView(ref, {once: false})
    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() =>{
        if(isInView){
            mainControls.start("visible")
            slideControls.start("visible")
        }
    }, [isInView])

  return (
    <div ref={ref} className='relative overflow-hidden w-fit'>
        <motion.div
            variants={ fadeInText() }
            initial='hidden'
            animate={mainControls}
            exit='hidden'
            transition={ transitionText() }
            >
            {children}
        </motion.div>
        <motion.div
            variants={ fadeInText2() }
            initial='hidden'
            animate={mainControls}
            exit='hidden'
            transition={ transitionText2() }
            style = { style() }
            >

        </motion.div>
    </div>
  )
}

export default TransitionText
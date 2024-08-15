import React, { useEffect, useRef } from 'react'
import { useAnimation, useInView, motion } from 'framer-motion'
import { fadeIn } from './fades'

function TransitionComponent({children, className}) {
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
    <div ref={ref} className='relative overflow-hidden w-full'>
        <motion.div
            variants={ fadeIn() }
            initial='hidden'
            animate={mainControls}
            exit='hidden'
            className={className}
            >
            {children}
        </motion.div>
    </div>
  )
}

export default TransitionComponent

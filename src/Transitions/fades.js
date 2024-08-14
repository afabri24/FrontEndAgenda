export const fadeIn = () => {
    return {
        hidden: {
            y: 80,
            opacity: 0,
            x:0,
            transition: {
                type: 'twen',
                duration: 0.5,
                delay: 0.5,
                ease: [0.25, 0.6, 0.3, 0.8]
            }
        },
        visible: {
            y:0,
            x:0,
            opacity: 1,
            transition: {
                type: 'twen',
                duration: 0.4,
                delay: 0.5,
                ease: [0.25, 0.25, 0.25, 0.75]
            }
        }
    }
};

export const fadeInText = () => {
    return {
        hidden: {
            opacity: 0,
            y: 75
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }
};

export const fadeInText2 = () => {
    return {
        hidden: {
            left: 0
        },
        visible: {
            left: '100%'
        }
    }
};

export const transitionText = () => {
    return {
        duration: 0.5,
        delay: 0.5
    }
}

export const transitionText2 = () => {
    return {
        duration: 0.5,
        ease: 'easeIn'
    }
}

export const style = () => {
    return {
        position: 'absolute',
        top: '4px',
        bottom: '4px',
        left: '0px',
        right: '0px',
        background: '#2874A6',
        zIndex: 20,
    }
  };
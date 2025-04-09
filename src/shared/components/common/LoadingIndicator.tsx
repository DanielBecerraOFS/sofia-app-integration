import Lottie from "lottie-react"
import CircleLoadingAnimation from "@/assets/animations/loading_animation.json"

interface CircleLoaderProps{
    width: number;
    height: number;
}

const LoadingIndicator: React.FC <CircleLoaderProps> = ({
    width=150,
    height= 150,
})=>{
    return (
        <Lottie animationData={CircleLoadingAnimation} style={{ width: width, height: height }} />
    )
}
export default LoadingIndicator;
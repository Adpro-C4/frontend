import CheckoutModule from "@/components/modules/CheckoutModule"
import { Suspense } from "react"

const Page = () => {
    return <div>
        <Suspense>
            <CheckoutModule/>
        </Suspense>
    </div>
}

export default Page
import SignupForm from "@/components/signup-form"

export default function PayFlowPage() {
    return (
        <SignupForm
            flowType="payflow"
            title=""
            description="Enter your information to get started with PayFlow"
            buttonText="Continue to PayFlow"
            redirectUrl="https://clickchain.ai/accounting/payflow"
        />
    )
} 
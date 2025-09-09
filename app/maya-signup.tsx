import SignupForm from "@/components/signup-form"

export default function LocalFlowPage() {
    return (
        <SignupForm
            flowType="maya"
            title=""
            description="Enter your information to get started with LocalFlow"
            buttonText="Continue to LocalFlow"
            redirectUrl="/maya"
        />
    )
}


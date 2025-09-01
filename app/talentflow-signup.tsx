import SignupForm from "@/components/signup-form"

export default function TalentFlowPage() {
    return (
        <SignupForm
            flowType="talentflow"
            title=""
            description="Enter your information to get started with TalentFlow"
            buttonText="Continue to TalentFlow"
            redirectUrl="https://clickchain.ai/talentacquisition/talentflow"
        />
    )
} 
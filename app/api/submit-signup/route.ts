import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

// Loads environment variables from .env automatically in Next.js

export async function POST(request: NextRequest) {
    try {
        console.log("🚀 [API] Starting signup submission...")

        // Check if request has content
        const contentType = request.headers.get('content-type')
        console.log("🔍 [API] Content-Type header:", contentType)

        if (!contentType || !contentType.includes('application/json')) {
            console.log("❌ [API] Invalid content type:", contentType)
            return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 400 })
        }

        // Check if request body exists
        const requestText = await request.text()
        console.log("🔍 [API] Raw request body:", requestText)
        console.log("🔍 [API] Request body length:", requestText.length)

        if (!requestText || requestText.trim() === '') {
            console.log("❌ [API] Empty request body")
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 })
        }

        let body
        try {
            body = JSON.parse(requestText)
            console.log("📥 [API] Received request body:", JSON.stringify(body, null, 2))
        } catch (parseError) {
            console.log("❌ [API] JSON parse error:", parseError)
            console.log("❌ [API] Failed to parse:", requestText)
            return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
        }

        const { firstName, lastName, email, flowType } = body

        // Quick validation
        if (!firstName || !lastName || !email) {
            console.log("❌ [API] Missing required fields:", { firstName, lastName, email })
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        console.log("✅ [API] Validation passed. Data to save:", {
            firstName,
            lastName,
            email,
            flowType,
            timestamp: new Date().toISOString()
        })

        // Check environment variables
        const {
            GOOGLE_CLIENT_EMAIL,
            GOOGLE_PRIVATE_KEY,
            GOOGLE_CLIENT_ID,
            GOOGLE_SHEET_ID,
        } = process.env

        console.log("🔧 [API] Environment variables check:")
        console.log("  - GOOGLE_CLIENT_EMAIL:", GOOGLE_CLIENT_EMAIL ? "✅ Set" : "❌ Missing")
        console.log("  - GOOGLE_PRIVATE_KEY:", GOOGLE_PRIVATE_KEY ? "✅ Set" : "❌ Missing")
        console.log("  - GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing")
        console.log("  - GOOGLE_SHEET_ID:", GOOGLE_SHEET_ID ? "✅ Set" : "❌ Missing")

        if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_SHEET_ID) {
            console.log("❌ [API] Missing Google API credentials")
            return NextResponse.json({ error: "Missing Google API credentials" }, { status: 500 })
        }

        console.log("🔐 [API] Setting up Google Sheets authentication...")

        // Set up Google Sheets API
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: GOOGLE_CLIENT_EMAIL,
                private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                client_id: GOOGLE_CLIENT_ID,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })

        const sheets = google.sheets({ version: "v4", auth })
        console.log("✅ [API] Google Sheets API initialized")

        // Add data to Google Sheet
        const spreadsheetId = GOOGLE_SHEET_ID
        const range = "Sheet1!A:E"
        const dataToAppend = [[firstName, lastName, email, flowType || "unknown", new Date().toISOString()]]

        console.log("📊 [API] Attempting to append data to Google Sheets:")
        console.log("  - Spreadsheet ID:", spreadsheetId)
        console.log("  - Range:", range)
        console.log("  - Data to append:", JSON.stringify(dataToAppend, null, 2))

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: dataToAppend,
            },
        })

        console.log("🎉 [API] Google Sheets API Response:")
        console.log("  - Status:", response.status)
        console.log("  - Status Text:", response.statusText)
        console.log("  - Response Data:", JSON.stringify(response.data, null, 2))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("💥 [API] Error during submission:")
        console.error("  - Error type:", error.constructor.name)
        console.error("  - Error message:", error.message)
        console.error("  - Error stack:", error.stack)
        console.error("  - Full error object:", JSON.stringify(error, null, 2))

        return NextResponse.json(
            {
                error: "Failed to submit data",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}

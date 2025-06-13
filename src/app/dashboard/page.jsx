import { getAuthSession } from "@/lib/auth";

export default async function Dashboard() {
    const session = await getAuthSession();
    if (!session) {
        return (
            <section className="w-full h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-gray-500">You must be signed in to view this page.</p>
                </div>
            </section>
        );
    }
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-4">Hi {session.user.name}</h1>
                <p className="text-gray-300">Welcome to your dashboard!</p>
            </div>
        </section>
    );
}
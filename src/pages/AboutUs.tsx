import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background" dir="rtl">
            {/* Header */}
            <header className="bg-card/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-10 shadow-lg shadow-primary/10">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                        درباره ما
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 space-y-4">
                <p className="text-foreground text-base md:text-lg">
                    تیم فنی:
                    ابولفضل عباسی، سجاد میرزایی، مجتبی تقی زاده، حجت قلندری، علی مرادپور، رضا جهانشاهی، رضا معین الدینی، حامد پورجهانشاهی
                </p>
                <p className="text-foreground text-base md:text-lg">
                    توسعه دهنده: مریم قلندری</p>
                <p className="text-foreground text-base md:text-lg">
                    تماس با ما:09301611824</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-6 py-2 bg-primary text-background rounded-lg shadow hover:bg-primary/80 transition"
                >
                    بازگشت به صفحه اصلی
                </button>
            </main>
        </div>
    );
};

export default About;

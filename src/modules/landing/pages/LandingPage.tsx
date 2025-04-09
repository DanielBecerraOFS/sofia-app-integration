import {
  AccordionFAQ,
  Appbar,
  AuroraText,
  ClientsCarrousel,
  FooterContainer,
  ServicesGrid,
  ShineBorder,
  TickerNumberCard,
} from "@/modules/landing/index";
import { Button } from "@/shared/components/ui/button";
import "animate.css";
import "@/modules/landing/styles/landing-page.css";

import SofiaBigConcept from "@/assets/images/sofia-2.0.png";
import Samplechart from "@/assets/images/sample-chart.png";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Check, Flame, Goal, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="app-content flex flex-col gap-4 relative w-full h-full text-background">
      
      <div className="ovelary-container landing-overlay absolute top-0 left-0 w-full h-full bg-scrim/30 z-1"></div>
      <Appbar />
      <main className="main-container relative w-full h-full z-5">
        <section className="hero-section relative min-h-[100svh] w-full  pt-[100px]">
          <div className="wrapper-section py-4 px-6 flex flex-col gap-4 h-[90svh] justify-center items-center">
            <h1 className="font-title text-7xl md:text-8xl text-center animate__animated animate__fadeInUp">
              Reach your business goals faster <br /> with the power of
              <AuroraText
                className="ml-3"
                colors={["#feec8a", "#fbc924", "#cb8403", "#421e06"]}
              >
                SOFIA
              </AuroraText>
            </h1>
            <h2 className="text-muted text-2xl animate__animated animate__fadeInUp animate__delay-1s">
              Discover how our services can streamline and enhance your business
              processes
            </h2>
            <div className="cta-hero-buttons flex flex-col md:flex-row gap-4 z-20 max-sm:w-full w-[400px] max-w-[80%]">
              <Button
                variant="default"
                className="text-on-primary hover:bg-on-primary hover:text-primary flex-1"
              >
                Start for Free
              </Button>
              <Button
                variant="outline"
                className="text-primary hover:bg-on-primary hover:text-primary flex-1"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
        <section className="services-section">
          <div className="wrapper-section py-4 px-6 flex flex-col gap-11 justify-center items-center">
            <div className="title-section-content flex items-center gap-2 w-full">
              <div className="separator-line h-1 flex-2  rounded-md left"></div>
              <h2 className="title-section font-title text-6xl text-center flex-1.5">
                Expertice in business Intelligence, <br />
                data science, and Articial Intelligence
              </h2>
              <div className="separator-line h-1 flex-2  rounded-md rigth"></div>
            </div>
            <div className="max-w-[90svw] md:max-w-[70svw]">
              <ServicesGrid />
            </div>
          </div>
        </section>
        <section className="sofia-section">
          <div className="wrapper-section py-4 px-6 flex flex-col gap-4 justify-center items-center">
            <div className="introduce-section flex gap-4 justify-center items-center w-full">
              <picture className="sofia-big-concept hidden md:block">
                <source src={SofiaBigConcept} />
                <img
                  src={SofiaBigConcept}
                  alt="Sofia big concept v2.0"
                  width={500}
                  height={200}
                />
              </picture>
              <div className="description-section py-4 px-6 flex flex-col gap-4 max-w-[600px] justify-center items-center">
                <h2 className="font-title text-7xl md:text-8xl text-center flex flex-col justify-center">
                  <span>
                    Introducing
                    <AuroraText
                      className="ml-2"
                      colors={["#feec8a", "#fbc924", "#cb8403", "#421e06"]}
                    >
                      SOFIA
                    </AuroraText>
                  </span>
                  <span>the AI assistent</span>
                </h2>
                <picture className="sofia-big-concept block md:hidden">
                  <source src={SofiaBigConcept} />
                  <img
                    src={SofiaBigConcept}
                    alt="Sofia big concept v2.0"
                    width={500}
                    height={200}
                  />
                </picture>
                <h3 className="text-muted text-2xl text-center">
                  Leverage your data with SOFIA to build automation, receive
                  tailored recommendations, and stay ahead with real-time
                  alerts—all focused on achieving your business goals.
                </h3>
                <div className="cta-hero-buttons flex flex-row gap-4 z-20 max-sm:w-full">
                  <Button
                    variant="default"
                    className="text-on-primary hover:bg-on-primary hover:text-primary max-sm:w-full"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
            <div className="tabs-capabilities w-full">
              <Tabs defaultValue="recommends">
                <TabsList className="grid w-full grid-cols-3 gap-2 md:max-w-[50svw] mx-auto h-auto">
                  <TabsTrigger
                    className="font-title text-2xl md:text-4xl"
                    value="recommends"
                  >
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger
                    className="font-title text-2xl md:text-4xl"
                    value="alerts"
                  >
                    Alerts
                  </TabsTrigger>
                  <TabsTrigger
                    className="font-title text-2xl md:text-4xl"
                    value="automatizations"
                  >
                    Automatizations
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="recommends">
                  <div className="wrapper-tabcontent flex max-sm:flex-col-reverse justify-center items-start px-4 py-2 gap-4">
                    <div className="flow-description flex flex-col gap-1 max-w-[90svw] md:max-w-[400px]">
                      <p className="text-tertiary-container-container">
                        AI Assistant Builder
                      </p>
                      <h2 className="text-4xl font-bold">
                        SOFIA can improvement your data analysis
                      </h2>
                      <p className="text-outline-variant">
                        By analyzing your data, SOFIA suggests impactful changes
                        to enhance your experience and drive smarter decisions.
                      </p>
                      <Button variant="default">Book a Demo</Button>
                    </div>
                    <div className="flow-chart-content flex p-2">
                      <picture className="coding-chart-concept">
                        <source src={Samplechart} />
                        <img
                          src={Samplechart}
                          alt="sample chart concept"
                          width={600}
                          height={200}
                        />
                      </picture>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section className="trusted-carrousel mt-10">
          <div className="wrapper-section py-14 flex flex-col gap-8 justify-center items-center">
            <h1 className="title-section text-7xl md:text-8xl font-title px-6 text-center">
              Trusted by industry leaders
            </h1>
            <div className="carrousel-container flex flex-col gap-4 w-full max-w-[100svw]">
              <div className="separator-line h-0.5 w-full rounded-md top max-w-[80%] mx-auto"></div>
              <ClientsCarrousel />
              <div className="separator-line h-0.5 w-full rounded-md bottom max-w-[80%] mx-auto"></div>
            </div>
          </div>
        </section>
        <section className="tickers-section ">
          <div className="wrapper-section py-32 flex flex-col gap-8 justify-center items-center min-h-[80svh]">
            <h1 className="title-section text-7xl md:text-8xl font-title px-6 text-center">
              Let
              <AuroraText colors={["#feec8a", "#fbc924", "#cb8403", "#421e06"]}>
                SOFIA
              </AuroraText>
              grow your business, <br />
              immediately
            </h1>
            <div className="card-tickers-content flex flex-col md:flex-row gap-4">
              <TickerNumberCard
                title="Learn about your business context"
                unit="x"
                value={5}
              />
              <TickerNumberCard title="Confiability" unit="%" value={99} />
              <TickerNumberCard title="AG time process" unit="s" value={2.9} />
            </div>
            <Button
              variant="default"
              className="text-on-primary hover:bg-on-primary hover:text-primary max-sm:w-[90%]"
            >
              Start now
            </Button>
          </div>
        </section>
        <section className="pricing-table-section">
          <div className="wrapper-section py-4 flex flex-col gap-8 justify-center items-center">
            <h2 className="title-section text-7xl md:text-8xl font-title px-6 text-center">
              Find Your Perfect Plan
            </h2>
            <p className="text-muted text-2xl text-center max-w-[80%] md:max-w-[60%]">
              Unlock the right features at the right time—choose a plan that
              grows with your business.
            </p>
            <div className="pricing-table-content flex flex-col gap-4 items-center">
              <div className="princing-cta-container border-primary rounded-md border-1 flex gap-4 px-2 py-2 bg-inverse-surface max-w-[250px]">
                <Button size="default" className="min-w-[100px]">
                  Monthly
                </Button>
                <Button variant="ghost" className="min-w-[100px]">
                  Yearly
                </Button>
              </div>
              <div className="pricing-table flex flex-col md:grid md:grid-cols-3 gap-4 mt-4">
                <div className="pricing-card p-4 bg-scrim/70 rounded-md border-1 border-primary max-w-[350px]">
                  <div className="wrapper-card flex flex-col gap-2 py-4 px-2">
                    <div className="upper-icon-plan w-8 h-8 rounded-md flex items-center justify-center bg-radial-[at_50%_75%] from-secondary-container via-secondary to-on-secondary-container to-90%">
                      <Goal />
                    </div>
                    <div className="princing-header flex flex-col gap-2 items-start justify-start">
                      <h2 className="pricing-title text-5xl text-primary font-bold">
                        Free
                      </h2>
                      <p className="pricing-description text-primary-container">
                        Experience the power of SOFIA with our free account
                      </p>
                      <div className="flex flex-row items-end gap-4">
                        <p className="pricing-current-value text-6xl text-secondary-container font-bold">
                          $0
                        </p>
                        <p className="pricing-frecuency text-outline-variant">
                          per month
                        </p>
                      </div>
                    </div>
                    <div className="divider-card h-0.5 bg-outline-variant max-w-[80%] rounded-md mx-auto"></div>
                    <div className="pricing-benefist-list flex flex-col items-start gap-4 min-h-[400px]">
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">2,000 Credits</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Try the OFI ecosystem</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">1 user</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">2 uses cases</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="w-full bg-radial-[at_50%_75%] from-on-primary to-primary-container to-90% text-on-primary-container"
                  >
                    Get started
                  </Button>
                </div>
                <div className="pricing-card p-4 bg-secondary/30 rounded-md relative max-w-[350px]">
                  <ShineBorder
                    shineColor={["#fbbf24", "#ffffff", "#a4d8e6", "#0e7490"]}
                  />
                  <div className="wrapper-card flex flex-col gap-2 py-4 px-2">
                    <div className="upper-icon-plan w-8 h-8 rounded-md flex items-center justify-center bg-radial-[at_50%_75%] from-secondary-container via-secondary to-on-secondary-container to-90%">
                      <Flame />
                    </div>
                    <div className="princing-header flex flex-col gap-2 items-start justify-start">
                      <h2 className="pricing-title text-5xl text-on-secondary font-bold">
                        PRO
                      </h2>
                      <p className="pricing-description text-primary-container">
                        For companies that want to achieve their goals
                      </p>
                      <div className="flex flex-row items-end gap-4">
                        <p className="pricing-current-value text-6xl text-on-secondary font-bold">
                          $70
                        </p>
                        <p className="pricing-frecuency text-outline-variant">
                          per month
                        </p>
                      </div>
                    </div>
                    <div className="divider-card h-0.5 bg-outline-variant max-w-[80%] rounded-md mx-auto"></div>
                    <div className="pricing-benefist-list flex flex-col items-start gap-4 min-h-[400px]">
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">100K Credits</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">
                          Detection of critical points on your business data
                        </p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">
                          Alerts generations about your critical business data
                        </p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Email support</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Chat support</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">5 user</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-secondary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Unlimit integrations</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="w-full bg-radial-[at_50%_75%] from-on-primary to-primary-container to-90% text-on-primary-container"
                  >
                    Get started
                  </Button>
                </div>
                <div className="pricing-card p-4 bg-scrim/70 rounded-md border-1 border-primary max-w-[350px]">
                  <div className="wrapper-card flex flex-col gap-2 py-4 px-2">
                    <div className="upper-icon-plan w-8 h-8 rounded-md flex items-center justify-center bg-radial-[at_50%_75%] from-secondary-container via-secondary to-on-secondary-container to-90%">
                      <Rocket />
                    </div>
                    <div className="princing-header flex flex-col gap-2 items-start justify-start">
                      <h2 className="pricing-title text-5xl text-primary font-bold">
                        To the Moon
                      </h2>
                      <p className="pricing-description text-primary-container">
                        For companies that REALLY want to unleash SOFIA.
                      </p>
                      <div className="flex flex-row items-end gap-4">
                        <p className="pricing-current-value text-6xl text-secondary-container font-bold">
                          $399
                        </p>
                        <p className="pricing-frecuency text-outline-variant">
                          per month
                        </p>
                      </div>
                    </div>
                    <div className="divider-card h-0.5 bg-outline-variant max-w-[80%] rounded-md mx-auto"></div>
                    <div className="pricing-benefist-list flex flex-col items-start gap-4 min-h-[400px]">
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">500K Credits</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">
                          Detection of critical points on your business data
                        </p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">
                          Alerts generations about your critical business data
                        </p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Fully assisted service</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Chat support priority</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">1-1 support with tech team</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Unlimited users</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Unlimit integrations</p>
                      </div>
                      <div className="flex flex-row gap-4 items-start justify-center">
                        <div className="check-icon text-tertiary-container">
                          <Check />
                        </div>
                        <p className="text-muted">Dedicated Account Manager</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="w-full bg-radial-[at_50%_75%] from-on-primary to-primary-container to-90% text-on-primary-container"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="faq-section max-w-[80%] mx-auto">
          <div className="wrapper-section py-14 flex flex-col md:flex-row gap-8 justify-center items-start">
            <div className="left-side-content flex-1 h-full">
              <h2 className="title-section text-6xl font-title px-6 text-center md:text-start">
                Frequently Asked <br />
                Questions about <br />
                <AuroraText
                  colors={["#feec8a", "#fbc924", "#cb8403", "#421e06"]}
                >
                  SOFIA
                </AuroraText>{" "}
              </h2>
            </div>
            <div className="right-side-content flex-1 h-full">
              <AccordionFAQ />
            </div>
          </div>
        </section>
        <FooterContainer />
      </main>
    </div>
  );
}

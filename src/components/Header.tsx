"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/Button";

interface HeaderProps {
  variant?: "landing" | "admin" | "default";
}

export const Header: React.FC<HeaderProps> = ({ variant = "default" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { label: "Início", href: "/", sectionId: null },
    { label: "Diferenciais", href: "/#benefits", sectionId: "benefits" },
    { label: "Matrículas", href: "/#matriculas", sectionId: "matriculas" },
    { label: "Galeria", href: "/#galeria", sectionId: "galeria" },
    { label: "Depoimentos", href: "/#depoimentos", sectionId: "depoimentos" },
  ];

  // Different header content based on variant
  const getHeaderContent = () => {
    switch (variant) {
      case "admin":
        return (
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center space-x-8">
              <img
                src="/images/logo/cultura-inglesa-logo-lion-h-nb.png"
                alt="Cultura Inglesa Teresina"
                className="h-12 w-auto"
              />
              <span className="text-sm text-gray-600">Admin</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                ← Voltar ao Site
              </Link>
            </div>
          </div>
        );

      case "landing":
      default:
        return (
          <>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/logo/cultura-inglesa-logo-lion-h-nb.png"
                alt="Cultura Inglesa Teresina"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    item.sectionId
                      ? scrollToSection(item.sectionId)
                      : (window.location.href = item.href)
                  }
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">(86) 3133-0700</span>
              </a>

              <Button
                onClick={() => scrollToSection("matriculas")}
                variant="primary"
                size="sm"
                className="shadow-lg"
              >
                Matricule-se
              </Button>

              {/* <WhatsAppButton
                phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
                variant="inline"
                className="px-3 py-2 text-sm"
                message="Olá! Vi o site da Cultura Inglesa Teresina e gostaria de mais informações sobre os cursos."
              /> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </>
        );
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {getHeaderContent()}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && variant !== "admin" && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() =>
                      item.sectionId
                        ? scrollToSection(item.sectionId)
                        : (window.location.href = item.href)
                    }
                    className="block w-full text-left text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile CTAs */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Button
                    onClick={() => scrollToSection("matriculas")}
                    variant="primary"
                    className="w-full"
                  >
                    Garantir Minha Vaga
                  </Button>

                  {/* <WhatsAppButton
                    phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
                    variant="inline"
                    className="w-full justify-center"
                    message="Olá! Vi o site da Cultura Inglesa Teresina e gostaria de mais informações sobre os cursos."
                  /> */}

                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    className="flex items-center justify-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors py-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">(86) 31330700</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16"></div>
    </>
  );
};

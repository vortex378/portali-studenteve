export default function HeroHeading() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-1 sm:gap-5">
      <div className="hero-title-box w-full">
        <div className="hero-title-box__inner">
          <h1 className="hero-title-text text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Portali i Studentëve
          </h1>
        </div>
      </div>

      <div className="hero-desc-box w-full">
        <p className="text-base font-medium text-foreground/85 sm:text-lg">
          Akademia e Forcave të Armatosura
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Platforma zyrtare për menaxhimin e studentëve, provimeve dhe
          profileve akademike. Një sistem modern, i sigurt dhe i përshtatshëm
          për institucionin tonë.
        </p>
      </div>
    </div>
  );
}

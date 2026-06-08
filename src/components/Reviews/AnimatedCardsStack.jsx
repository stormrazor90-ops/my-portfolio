import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react"

/* ─── Context ─────────────────────────────────────────── */
const ContainerScrollContext = React.createContext(undefined)

function useContainerScrollContext() {
  const ctx = React.useContext(ContainerScrollContext)
  if (!ctx) throw new Error("must be inside ContainerScroll")
  return ctx
}

/* ─── ContainerScroll ─────────────────────────────────── */
export const ContainerScroll = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={className}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

/* ─── CardsContainer ──────────────────────────────────── */
export const CardsContainer = ({ children, className, style, ...props }) => {
  const ref = React.useRef(null)
  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1000px", position: "relative", ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

/* ─── CardTransformed ─────────────────────────────────── */
export const CardTransformed = React.forwardRef(
  (
    {
      arrayLength,
      index,
      incrementY = 10,
      incrementZ = 10,
      variant = "dark",
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext()

    const start = index / (arrayLength + 1)
    const end = (index + 1) / (arrayLength + 1)
    const range = React.useMemo(() => [start, end], [start, end])
    const rotateRange = [range[0] - 1.5, range[1] / 1.5]

    const y = useTransform(scrollYProgress, range, ["0%", "-180%"])
    const rotate = useTransform(scrollYProgress, rotateRange, [
      -index + 90,
      0,
    ])
    const transform = useMotionTemplate`translateZ(${index * incrementZ}px) translateY(${y}) rotate(${rotate}deg)`

    const dx = useTransform(scrollYProgress, rotateRange, [4, 0])
    const dy = useTransform(scrollYProgress, rotateRange, [4, 12])
    const blur = useTransform(scrollYProgress, rotateRange, [2, 24])
    const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2])
    const filter = useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`

    const cardStyle = {
      position: "absolute",
      willChange: "transform",
      top: index * incrementY,
      transform,
      backfaceVisibility: "hidden",
      zIndex: (arrayLength - index) * incrementZ,
      filter,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem",
      borderRadius: "1rem",
      padding: "1.5rem",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,198,85,0.15)",
      background: "rgba(18,16,10,0.82)",
      ...style,
    }

    return (
      <motion.div
        layout="position"
        ref={ref}
        style={cardStyle}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
CardTransformed.displayName = "CardTransformed"

/* ─── ReviewStars ─────────────────────────────────────── */
export const ReviewStars = React.forwardRef(
  ({ rating, maxRating = 5, className, style, ...props }, ref) => {
    const filled = Math.floor(rating)
    const frac = rating - filled
    const empty = maxRating - filled - (frac > 0 ? 1 : 0)

    const starStyle = { width: 16, height: 16, display: "inline-block", color: "#FFC655" }
    const emptyStyle = { ...starStyle, color: "#3a3428" }

    const StarPath = () => (
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    )

    return (
      <div
        ref={ref}
        style={{ display: "flex", alignItems: "center", gap: 8, ...style }}
        className={className}
        {...props}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {[...Array(filled)].map((_, i) => (
            <svg key={`f-${i}`} style={starStyle} fill="currentColor" viewBox="0 0 20 20">
              <StarPath />
            </svg>
          ))}
          {frac > 0 && (
            <svg style={starStyle} fill="currentColor" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half-grad">
                  <stop offset={`${frac * 100}%`} stopColor="#FFC655" />
                  <stop offset={`${frac * 100}%`} stopColor="#3a3428" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half-grad)"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
              />
            </svg>
          )}
          {[...Array(empty)].map((_, i) => (
            <svg key={`e-${i}`} style={emptyStyle} fill="currentColor" viewBox="0 0 20 20">
              <StarPath />
            </svg>
          ))}
        </div>
        <span className="sr-only">{rating} out of {maxRating}</span>
      </div>
    )
  }
)
ReviewStars.displayName = "ReviewStars"

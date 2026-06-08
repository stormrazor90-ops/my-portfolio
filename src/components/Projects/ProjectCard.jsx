import styles from './Projects.module.css'

export default function ProjectCard({ project }) {
  const { title, description, tags, liveUrl, repoUrl } = project

  return (
    <article className={styles.card}>
      {/* Thumbnail placeholder — replace with <img> */}
      <div className={styles.thumb}>
        <span>{title}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>

        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.links}>
          <a href={liveUrl} target="_blank" rel="noreferrer" className={styles.liveBtn}>
            Live ↗
          </a>
          <a href={repoUrl} target="_blank" rel="noreferrer" className={styles.repoBtn}>
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}

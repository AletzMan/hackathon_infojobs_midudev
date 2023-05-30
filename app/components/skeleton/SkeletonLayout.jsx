import "react-loading-skeleton/dist/skeleton.css"
import Skeleton from "react-loading-skeleton"
import styles from "./skeleton.module.css"

export function SkeletonLayout({ count }) {
  function SkeletonSingle() {
    return (
      <div className={styles.skeleton}>
        <Skeleton
          width={120}
          height={20}
          borderRadius={50}
          style={{ margin: "0.2em", gridRow: "1 / 2", gridColumn: "1 / 2" }}
          baseColor={"#AEAEAE"}
        />
        <div className={styles.urgent}>
          <Skeleton
            width={110}
            height={20}
            borderRadius={50}
            style={{ margin: "0.2em", gridRow: "1 / 2", gridColumn: "4 / 5" }}
            baseColor={"#AEAEAE"}
          />
        </div>
        <div className={styles.type}>
          <Skeleton
            width={120}
            height={20}
            borderRadius={50}
            style={{ margin: "0.5em", gridRow: "2 / 3", gridColumn: "1 / 2" }}
            baseColor={"#AEAEAE"}
          />
        </div>
        <div className={styles.title}>
          <Skeleton
            width={400}
            height={25}
            borderRadius={5}
            baseColor={"#AEAEAE"}
          />
        </div>
        <div className={styles.contract}>
          <Skeleton
            width={350}
            height={10}
            borderRadius={5}
            baseColor={"#AEAEAE"}
          />
        </div>
        <div className={styles.experience}>
          <Skeleton
            width={250}
            height={15}
            borderRadius={5}
            baseColor={"#AEAEAE"}
          />
        </div>
        <div className={styles.company}>
          <Skeleton
            width={250}
            height={18}
            borderRadius={5}
            baseColor={"#AEAEAE"}
          />
        </div>
        <div className={styles.logocompany}>
          <Skeleton
            circle
            width={70}
            height={70}
            borderRadius={5}
            baseColor={"#AEAEAE"}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <SkeletonSingle />
      <SkeletonSingle />
      <SkeletonSingle />
    </>
  )
}

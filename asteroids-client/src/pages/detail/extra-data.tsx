import { RowData } from '@/components'
import { type OrbitalDataModel } from '@/models'
import styles from './styles.module.css'

export function ExtraDataComponent ({ orbitalData }: { orbitalData: OrbitalDataModel | undefined }) {
  if (orbitalData == null) {
    return null
  }
  const {
    orbitDeterminationDate,
    firstObservationDate,
    lastObservationDate,
    dataArcInDays,
    observationsUsed,
    orbitUncertainty,
    minimumOrbitIntersection,
    jupiterTisserandInvariant,
    epochOsculation,
    eccentricity,
    semiMajorAxis,
    inclination,
    ascendingNodeLongitude,
    orbitalPeriod,
    perihelionDistance,
    perihelionArgument,
    aphelionDistance,
    perihelionTime,
    meanAnomaly,
    meanMotion,
    equinox
  } = orbitalData

  return (
    <div className={styles.extra}>
      <h3> Orbital data </h3>
      <RowData
        title="Orbit determination date"
        value={orbitDeterminationDate}
      />
      <RowData
        title="First observation date"
        value={firstObservationDate}
      />
      <RowData
        title="Last observation date"
        value={lastObservationDate}
      />
      <RowData
        title="Data arc in days"
        value={dataArcInDays}
      />
      <RowData
        title="Observations used"
        value={observationsUsed}
      />
      <RowData
        title="Orbit uncertainty"
        value={orbitUncertainty}
      />
      <RowData
        title="Minimum orbit intersection"
        value={minimumOrbitIntersection}
      />
      <RowData
        title="Jupiter Tisserand invariant"
        value={jupiterTisserandInvariant}
      />
      <RowData
        title="Epoch osculation"
        value={epochOsculation}
      />
      <RowData title="Eccentricity" value={eccentricity} />
      <RowData
        title="Semi major axis"
        value={semiMajorAxis}
      />
      <RowData title="Inclination" value={inclination} />
      <RowData
        title="Ascending node longitude"
        value={ascendingNodeLongitude}
      />
      <RowData
        title="Orbital period"
        value={orbitalPeriod}
      />
      <RowData
        title="Perihelion distance"
        value={perihelionDistance}
      />
      <RowData
        title="Perihelion argument"
        value={perihelionArgument}
      />
      <RowData
        title="Aphelion distance"
        value={aphelionDistance}
      />
      <RowData
        title="Perihelion time"
        value={perihelionTime}
      />
      <RowData title="Mean anomaly" value={meanAnomaly} />
      <RowData title="Mean motion" value={meanMotion} />
      <RowData title="Equinox" value={equinox} />
    </div>
  )
}

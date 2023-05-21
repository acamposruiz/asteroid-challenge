
export interface AsteroidModel {
  id: string
  name: string
  estimatedDiameter: number
  date: string
  isPotentiallyHazardousAsteroid: boolean
  jplUrl: string
  orbitalData?: OrbitalDataModel
}

export interface OrbitalDataModel {
  aphelionDistance: string
  ascendingNodeLongitude: string
  dataArcInDays: number
  eccentricity: string
  epochOsculation: string
  equinox: string
  firstObservationDate: string
  inclination: string
  jupiterTisserandInvariant: string
  lastObservationDate: string
  meanAnomaly: string
  meanMotion: string
  minimumOrbitIntersection: string
  observationsUsed: number
  orbitClass?: OrbitClassModel
  orbitDeterminationDate: string
  orbitId: string
  orbitUncertainty: string
  orbitalPeriod: string
  perihelionArgument: string
  perihelionDistance: string
  perihelionTime: string
  semiMajorAxis: string
}

export interface OrbitClassModel {
  orbitClassDescription: string
  orbitClassRange: string
  orbitClassType: string
}

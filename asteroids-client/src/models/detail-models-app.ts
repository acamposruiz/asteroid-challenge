export interface ResponseDetailModel {
  absoluteMagnitudeH: number
  closeApproachData: CloseApproachDatumDetailModel[]
  designation: string
  estimatedDiameter: EstimatedDiameterDetailModel
  id: string
  isPotentiallyHazardousAsteroid: boolean
  isSentryObject: boolean
  links: LinksDetailModel
  name: string
  nasaJplUrl: string
  neoReferenceId: string
  orbitalData: OrbitalDataDetailModel
}

export interface CloseApproachDatumDetailModel {
  closeApproachDate: string
  closeApproachDateFull: string
  epochDateCloseApproach: number
  missDistance: MissDistanceDetailModel
  orbitingBody: OrbitingBodyDetailModel
  relativeVelocity: RelativeVelocityDetailModel
}

export interface MissDistanceDetailModel {
  astronomical: string
  kilometers: string
  lunar: string
  miles: string
}

export enum OrbitingBodyDetailModel {
  Earth = 'Earth',
}

export interface RelativeVelocityDetailModel {
  kilometersPerHour: string
  kilometersPerSecond: string
  milesPerHour: string
}

export interface EstimatedDiameterDetailModel {
  feet: FeetDetailModel
  kilometers: FeetDetailModel
  meters: FeetDetailModel
  miles: FeetDetailModel
}

export interface FeetDetailModel {
  estimatedDiameterMax: number
  estimatedDiameterMin: number
}

export interface LinksDetailModel {
  self: string
}

export interface OrbitalDataDetailModel {
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
  orbitClass: OrbitClassDetailModel
  orbitDeterminationDate: string
  orbitId: string
  orbitUncertainty: string
  orbitalPeriod: string
  perihelionArgument: string
  perihelionDistance: string
  perihelionTime: string
  semiMajorAxis: string
}

export interface OrbitClassDetailModel {
  orbitClassDescription: string
  orbitClassRange: string
  orbitClassType: string
}

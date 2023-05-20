export interface ResponseModel {
  elementCount: number
  links: RootObjectLinksModel
  nearEarthObjects: Record<string, AsteroidModel[]>
}

export interface RootObjectLinksModel {
  next: string
  previous: string
  self: string
}

export interface AsteroidModel {
  id: string
  name: string
  estimatedDiameter: number
  date: string
  isPotentiallyHazardousAsteroid: boolean
  jplUrl: string
}

export interface CloseApproachDatumModel {
  closeApproachDate: string
  closeApproachDateFull: string
  epochDateCloseApproach: number
  missDistance: MissDistanceModel
  orbitingBody: OrbitingBodyModel
  relativeVelocity: RelativeVelocityModel
}

export interface MissDistanceModel {
  astronomical: string
  kilometers: string
  lunar: string
  miles: string
}

export enum OrbitingBodyModel {
  Earth = 'Earth',
}

export interface RelativeVelocityModel {
  kilometersPerHour: string
  kilometersPerSecond: string
  milesPerHour: string
}

export interface EstimatedDiameterModel {
  feet: FeetModel
  kilometers: FeetModel
  meters: FeetModel
  miles: FeetModel
}

export interface FeetModel {
  estimatedDiameterMax: number
  estimatedDiameterMin: number
}

export interface NearEarthObjectLinksModel {
  self: string
}

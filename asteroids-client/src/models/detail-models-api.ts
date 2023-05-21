export interface ResponseDetailAPI {
  id: string
  name: string
  links: LinksDetailAPI
  absolute_magnitude_h: number
  close_approach_data: CloseApproachDatumDetailAPI[]
  estimated_diameter: EstimatedDiameterDetailAPI
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  nasa_jpl_url: string
  neo_reference_id: string
  designation: string
  orbital_data: OrbitalDataDetailAPI
}

export interface CloseApproachDatumDetailAPI {
  close_approach_date: string
  close_approach_date_full: string
  epoch_date_close_approach: number
  miss_distance: MissDistanceDetailAPI
  orbiting_body: OrbitingBodyDetailAPI
  relative_velocity: RelativeVelocityDetailAPI
}

export interface MissDistanceDetailAPI {
  astronomical: string
  kilometers: string
  lunar: string
  miles: string
}

export enum OrbitingBodyDetailAPI {
  Earth = 'Earth',
}

export interface RelativeVelocityDetailAPI {
  kilometers_per_hour: string
  kilometers_per_second: string
  miles_per_hour: string
}

export interface EstimatedDiameterDetailAPI {
  feet: FeetDetailAPI
  kilometers: FeetDetailAPI
  meters: FeetDetailAPI
  miles: FeetDetailAPI
}

export interface FeetDetailAPI {
  estimated_diameter_max: number
  estimated_diameter_min: number
}

export interface LinksDetailAPI {
  self: string
}

export interface OrbitalDataDetailAPI {
  aphelion_distance: string
  ascending_node_longitude: string
  data_arc_in_days: number
  eccentricity: string
  epoch_osculation: string
  equinox: string
  first_observation_date: string
  inclination: string
  jupiter_tisserand_invariant: string
  last_observation_date: string
  mean_anomaly: string
  mean_motion: string
  minimum_orbit_intersection: string
  observations_used: number
  orbit_class: OrbitClassDetailAPI
  orbit_determination_date: string
  orbit_id: string
  orbit_uncertainty: string
  orbital_period: string
  perihelion_argument: string
  perihelion_distance: string
  perihelion_time: string
  semi_major_axis: string
}

export interface OrbitClassDetailAPI {
  orbit_class_description: string
  orbit_class_range: string
  orbit_class_type: string
}
